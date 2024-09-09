import { BatchItem } from "@/hooks/useParseText";
import { getTokenizer, tokenize } from "kuromojin";

const DICT_PATH = "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict";

export async function getTokens(paragraphs: BatchItem[]) {
  window.kuromojin = {
    dicPath: DICT_PATH,
  };

  applyKuromojiFix();

  await getTokenizer();

  const parsedParagraphs = await Promise.all(
    paragraphs.map(async (paragraph) => {
      const tokens = await tokenize(paragraph.baseText);

      return {
        ...paragraph,
        tokens: tokens,
      };
    }),
  );

  return parsedParagraphs;
}

/**
 * Fix an issue with kuromoji when loading dict from external urls
 * See: https://github.com/takuyaa/kuromoji.js/issues/37
 * Adapted from: https://github.com/mobilusoss/textlint-browser-runner/pull/7
 */

type ExtendedXMLHttpRequest = XMLHttpRequest & {
  patched_open: (method: string, url: string) => void;
};

const DICT_PATH_WITHOUT_DOUBLE_SLASH =
  "https:/cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict";

export function applyKuromojiFix(): void {
  (XMLHttpRequest.prototype as ExtendedXMLHttpRequest).patched_open =
    XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method: string, url: string) {
    if (url.indexOf(DICT_PATH_WITHOUT_DOUBLE_SLASH) === 0) {
      (this as ExtendedXMLHttpRequest).patched_open(
        method,
        url.replace(DICT_PATH_WITHOUT_DOUBLE_SLASH, DICT_PATH),
      );
    } else {
      (this as ExtendedXMLHttpRequest).patched_open(method, url);
    }
  };
}
