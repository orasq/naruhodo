"use server";

// import kuromoji from "kuromoji";
import { getTokenizer, tokenize } from "kuromojin";

const DIC_URL = "src/lib/kuromoji/dict";

export const getTokens = async (sentence: string) => {
  getTokenizer({ dicPath: DIC_URL });

  const tokens = await tokenize(sentence);

  return tokens;
};
