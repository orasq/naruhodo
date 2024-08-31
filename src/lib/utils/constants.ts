export const ICON_SIZE = 22;

export const THEME_COOKIE_KEY = "color-theme";

export const BOOK_FONT_SIZE_COOKIE_VALUE = "book-font-size";

export const BOOKMARK_KEY = (slug: string | string[]) => {
  const slugKey = Array.isArray(slug) ? slug.join("-") : slug;
  return `bookmark-${slugKey}`;
};

export const FINISHED_BOOK_KEY = (slug: string | string[]) => {
  const slugKey = Array.isArray(slug) ? slug.join("-") : slug;
  return `finished-${slugKey}`;
};
