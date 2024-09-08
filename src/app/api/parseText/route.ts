// import { NextRequest, NextResponse } from "next/server";
// import path from "path";
// import { getTokenizer, KuromojiToken, tokenize } from "kuromojin";
// import sqlite3, { type Database } from "sqlite3";
// import type {
//   DBKanji,
//   DBResultEntry,
//   DBWord,
//   ParsedWord,
// } from "@/lib/types/dictionary.types";

// const DIC_URL = "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict";
// // const DIC_URL = path.resolve(process.cwd(), "src/lib/kuromoji/dict");
// const JMDICT_DB_PATH = path.resolve(process.cwd(), "src/lib/jmdict/jmdict.db");

// export async function POST(req: NextRequest) {
//   console.log({ DIC_URL, JMDICT_DB_PATH });

//   try {
//     const { paragraphs } = await req.json();

//     if (!paragraphs || !Array.isArray(paragraphs)) {
//       return NextResponse.json(
//         { error: "Invalid or missing paragraphs" },
//         { status: 400 },
//       );
//     }

//     // initialize tokenizer
//     await getTokenizer({ dicPath: DIC_URL });

//     // open the SQLite database
//     const db = new sqlite3.Database(JMDICT_DB_PATH);
//     db.run("PRAGMA journal_mode = WAL;");

//     // Process paragraphs and tokenize them
//     const parsedParagraphs = await Promise.all(
//       paragraphs.map(async (paragraph: { baseText: string }) => {
//         const tokens = await getTextTokens(paragraph.baseText);

//         return {
//           ...paragraph,
//           parsedText: await mapTokenWithDictionaryEntries(db, tokens),
//         };
//       }),
//     );

//     // close database connection
//     db.close();

//     // return the tokenized paragraphs
//     return NextResponse.json({ parsedParagraphs }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

// /**
//  * Utility functions for tokenizing and fetching dictionary entries
//  */

// type SkippableKuromojiToken = KuromojiToken & { skip: boolean };

// async function getTextTokens(text: string) {
//   return reduceParsedParagraphs(await tokenize(text));
// }

// function reduceParsedParagraphs(parsedParagraphs: KuromojiToken[]) {
//   return (parsedParagraphs as SkippableKuromojiToken[]).reduce(
//     (acc: KuromojiToken[] | [], curr, index, baseArray) => {
//       // skip current item if applicable
//       if (curr.skip) return acc;

//       // merge current item with next one
//       if (
//         baseArray[index + 1] &&
//         shouldMergeWithNext(curr, baseArray[index + 1])
//       ) {
//         const nextWord = baseArray[index + 1];

//         if (!nextWord) return [...acc, curr];

//         const newSurfaceForm = curr.surface_form + nextWord.surface_form;

//         // don't handle next word
//         baseArray[index + 1] = { ...nextWord, skip: true };

//         return [...acc, { ...curr, surface_form: newSurfaceForm }];
//       }

//       // merge current item with previous one
//       if (shouldMergeWithPrev(curr)) {
//         // remove previous item from acc
//         const prevWord = acc.pop();

//         if (!prevWord) return [...acc, curr];

//         const newSurfaceWord = prevWord.surface_form + curr.surface_form;

//         return [...acc, { ...prevWord, surface_form: newSurfaceWord }];
//       }

//       return [...acc, curr];
//     },
//     [],
//   );
// }

// function shouldMergeWithNext(token: KuromojiToken, nextToken: KuromojiToken) {
//   return (
//     (["連用形", "未然形", "連用タ接続"].includes(token.conjugated_form) &&
//       nextToken.pos === "助動詞") ||
//     // (["未然形"].includes(token.conjugated_form) &&
//     //   nextToken.pos_detail_1 === "接尾") ||
//     (["連用タ接続", "連用形"].includes(token.conjugated_form) &&
//       nextToken.pos_detail_1 === "接続助詞") ||
//     (token.basic_form === "ん" &&
//       token.pos_detail_1 === "非自立" &&
//       nextToken.basic_form === "です")
//   );
// }

// function shouldMergeWithPrev(token: KuromojiToken) {
//   return (
//     // token.pos === "krkrkr"
//     (token.pos === "助動詞" && token.conjugated_form === "体言接続") ||
//     (token.pos_detail_1 === "接尾" && token.pos_detail_2 === "助数詞") ||
//     // (token.pos === "助動詞" && token.conjugated_form === "基本形") ||
//     // (token.pos === "助詞" && token.pos_detail_2 === "連語") ||
//     // (token.pos === "助詞" && token.pos_detail_1 === "接続助詞") ||
//     (token.pos === "動詞" &&
//       token.conjugated_type === "一段" &&
//       token.pos_detail_1 === "非自立")
//   );
// }

// function mapTokenWithDictionaryEntries(
//   db: Database,
//   tokens: KuromojiToken[],
// ): Promise<ParsedWord[]> {
//   return Promise.all(
//     tokens.map(async (token) => {
//       const entry =
//         token.word_type === "UNKNOWN"
//           ? undefined
//           : await fetchDictionaryEntry(db, token.basic_form);
//       return {
//         text: token.surface_form,
//         dictionaryEntry: {
//           wordBasicForm: token.basic_form,
//           type: entry?.foundInKanji ? "kanji" : "kana",
//           fullEntry: entry?.row,
//         },
//       };
//     }),
//   );
// }

// async function fetchDictionaryEntry(
//   db: Database,
//   kanjiText: string,
// ): Promise<DBResultEntry | undefined> {
//   return new Promise((resolve, reject) => {
//     db.get(
//       `SELECT word_id FROM kanji WHERE text = ?`,
//       [kanjiText],
//       (err, row: DBKanji) => {
//         if (err || !row) return resolve(undefined);

//         db.get(
//           `SELECT * FROM word WHERE id = ?`,
//           [row.word_id],
//           (err, row: DBWord) => {
//             if (err) resolve(undefined);

//             resolve({ row, foundInKanji: true });
//           },
//         );
//       },
//     );
//   });
// }
