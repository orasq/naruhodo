import { turso } from "@/lib/db";
import {
  DBResultEntry,
  DBWord,
  ParsedWord,
} from "@/lib/types/dictionary.types";
import type { WordToken } from "@/lib/types/types";
import { Row } from "@libsql/client";
import { KuromojiToken } from "kuromojin";

export async function getDictionaryEntries(wordTokensArray: WordToken[]) {
  const dictionaryEntries = await Promise.all(
    wordTokensArray.map(async (wordTokens) => ({
      ...wordTokens,
      parsedText: await mapTokenWithDictionaryEntries(wordTokens.tokens),
    })),
  );

  console.log({ dictionaryEntries });

  return dictionaryEntries;
}

function mapTokenWithDictionaryEntries(
  tokens: KuromojiToken[],
): Promise<ParsedWord[]> {
  return Promise.all(
    tokens.map(async (token) => {
      const entry =
        token.word_type === "UNKNOWN"
          ? undefined
          : await fetchDictionaryEntry(token.basic_form);

      return {
        text: token.surface_form,
        dictionaryEntry: {
          wordBasicForm: token.basic_form,
          type: entry?.foundInKanji ? "kanji" : "kana",
          fullEntry: entry?.row,
        },
      };
    }),
  );
}

async function fetchDictionaryEntry(
  word: string,
): Promise<DBResultEntry | undefined> {
  return new Promise(async (resolve) => {
    const result = await getWordId(word);
    const wordId = result?.[0].word_id as number;

    if (!wordId) {
      resolve(undefined);
      return;
    }

    const dictionaryEntry = await fetchWord(wordId);

    resolve(dictionaryEntry);
  });
}

async function getWordId(word: string): Promise<Row[] | undefined> {
  return new Promise(async (resolve) => {
    // first try to find in kanji table
    const wordByKanji = await fetchKanji(word);

    if (wordByKanji && wordByKanji.length > 0) {
      resolve(wordByKanji);
      return;
    }

    // if not found in kanji, try kana table
    const wordByKana = await fetchKana(word);

    if (wordByKana && wordByKana.length > 0) {
      resolve(wordByKana);
      return;
    }

    resolve(undefined);
  });
}

async function fetchKanji(word: string): Promise<Row[] | undefined> {
  return new Promise(async (resolve) => {
    const { rows } = await turso.execute({
      sql: "SELECT word_id FROM kanji WHERE text = ? LIMIT 1",
      args: [word],
    });

    resolve(rows);
  });
}

async function fetchKana(word: string): Promise<Row[] | undefined> {
  return new Promise(async (resolve) => {
    const { rows } = await turso.execute({
      sql: "SELECT word_id FROM kana WHERE text = ? LIMIT 1",
      args: [word],
    });

    resolve(rows);
  });
}

async function fetchWord(wordId: number): Promise<DBResultEntry | undefined> {
  return new Promise(async (resolve) => {
    const { rows } = await turso.execute({
      sql: "SELECT * FROM word WHERE id = ? LIMIT 1",
      args: [wordId],
    });

    if (rows.length === 0) {
      resolve(undefined);
      return;
    }

    const wordRow = rows[0] as unknown as DBWord;

    resolve({ row: wordRow, foundInKanji: true });
  });
}
