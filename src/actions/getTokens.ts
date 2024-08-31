"use server";

import { BatchItem } from "@/hooks/useParseText";
import { getTokenizer, KuromojiToken, tokenize } from "kuromojin";
const sqlite3 = require("sqlite3").verbose();

const DIC_URL = "src/lib/kuromoji/dict";
const DB_PATH = "src/lib/jmdict/dict.db";

export const getTokens = async (paragraphs: BatchItem[]) => {
  getTokenizer({ dicPath: DIC_URL });

  const parsedParagraphs = await Promise.all(
    paragraphs.map(async (paragraph) => {
      return {
        ...paragraph,
        parsedText: reduceParsedParagraphs(await tokenize(paragraph.baseText)),
      };
    }),
  );

  // Open database
  const db = new sqlite3.Database(DB_PATH);

  parsedParagraphs.forEach((paragraph) => {
    return paragraph.parsedText.forEach(async (token) => {
      await fetchWordByKanji(db, token.basic_form);
    });
  });

  // await fetchWordByKanji(db, "殿");
  // await fetchWordByKanji(db, "殿下");
  // await fetchWordByKanji(db, "殿方");
  // await fetchWordByKanji(db, "殿堂");
  // await fetchWordByKanji(db, "澱粉");
  // await fetchWordByKanji(db, "殿様蝗虫");
  // await fetchWordByKanji(db, "殿堂入り");

  // console.log("coucou");

  // Fetch word based on a kanji entry

  // Close the database when done
  db.close();

  return parsedParagraphs;
};

/**
 * Utils
 */

type SkippableKuromojiToken = KuromojiToken & { skip: boolean };

function reduceParsedParagraphs(parsedParagraphs: KuromojiToken[]) {
  return (parsedParagraphs as SkippableKuromojiToken[]).reduce(
    (acc: KuromojiToken[] | [], curr, index, baseArray) => {
      // skip current item if applicable
      if (curr.skip) return acc;

      // merge current item with next one
      if (
        baseArray[index + 1] &&
        shouldMergeWithNext(curr, baseArray[index + 1])
      ) {
        const nextWord = baseArray[index + 1];

        if (!nextWord) return [...acc, curr];

        const newSurfaceForm = curr.surface_form + nextWord.surface_form;

        // don't handle next word
        baseArray[index + 1] = { ...nextWord, skip: true };

        return [...acc, { ...curr, surface_form: newSurfaceForm }];
      }

      // merge current item with previous one
      if (shouldMergeWithPrev(curr)) {
        // remove previous item from acc
        const prevWord = acc.pop();

        if (!prevWord) return [...acc, curr];

        const newSurfaceWord = prevWord.surface_form + curr.surface_form;

        return [...acc, { ...prevWord, surface_form: newSurfaceWord }];
      }

      return [...acc, curr];
    },
    [],
  );
}

function shouldMergeWithNext(token: KuromojiToken, nextToken: KuromojiToken) {
  return (
    (["連用形", "未然形", "連用タ接続"].includes(token.conjugated_form) &&
      nextToken.pos === "助動詞") ||
    // (["未然形"].includes(token.conjugated_form) &&
    //   nextToken.pos_detail_1 === "接尾") ||
    (["連用タ接続", "連用形"].includes(token.conjugated_form) &&
      nextToken.pos_detail_1 === "接続助詞") ||
    (token.basic_form === "ん" &&
      token.pos_detail_1 === "非自立" &&
      nextToken.basic_form === "です")
  );
}

function shouldMergeWithPrev(token: KuromojiToken) {
  return (
    // token.pos === "krkrkr"
    (token.pos === "助動詞" && token.conjugated_form === "体言接続") ||
    (token.pos_detail_1 === "接尾" && token.pos_detail_2 === "助数詞") ||
    // (token.pos === "助動詞" && token.conjugated_form === "基本形") ||
    // (token.pos === "助詞" && token.pos_detail_2 === "連語") ||
    // (token.pos === "助詞" && token.pos_detail_1 === "接続助詞") ||
    (token.pos === "動詞" &&
      token.conjugated_type === "一段" &&
      token.pos_detail_1 === "非自立")
  );
}

// Function to fetch word details based on a kanji
async function fetchWordByKanji(db, kanjiText) {
  db.get(
    `SELECT word_id FROM kanji WHERE text = ?`,
    [kanjiText],
    (err, row) => {
      if (err) throw err;

      if (!row) {
        console.log("No word found for this kanji.");
        return;
      } else {
        db.get(`SELECT * FROM word WHERE id = ?`, [row.word_id], (err, row) => {
          if (err) throw err;
          console.log(row);
        });
      }
    },
  );
}
