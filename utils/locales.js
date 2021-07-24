export const locales = ["en", "es"];

export const getFilteredCategories = (categories) =>
  categories.filter((el) => !locales.includes(el.slug));
