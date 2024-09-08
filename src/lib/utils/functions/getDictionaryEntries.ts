import { turso } from "@/lib/db";
import { DBResultEntry } from "@/lib/types/dictionary.types";
import type { WordToken } from "@/lib/types/types";

const JMDICT_DB_PATH = "src/lib/jmdict/jmdict.db";

export async function getDictionaryEntries(wordTokensArray: WordToken[]) {
  console.log({ wordTokensArray });

  wordTokensArray.forEach((wordTokens) => {
    wordTokens.tokens.map((token) => {
      fetchDictionaryEntry(token.basic_form);
    });
  });

  // open the SQLite database
  // const db = new sqlite3.Database(JMDICT_DB_PATH);
  // db.run("PRAGMA journal_mode = WAL;");
}

async function fetchDictionaryEntry(
  kanjiText: string,
): Promise<DBResultEntry | undefined> {
  return new Promise(async (resolve, reject) => {
    const { rows } = await turso.execute({
      sql: "SELECT word_id FROM kanji WHERE text = ?",
      args: [kanjiText],
    });

    console.log({ rows });
  });
}
