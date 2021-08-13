export const locales = ["en", "es"];

export const getFilteredCategories = (categories) =>
  categories.filter((el) => !locales.includes(el.slug));

export const getLocaleFromCategories = (categories) =>
  categories.find((el) => locales.includes(el.slug)).name;
