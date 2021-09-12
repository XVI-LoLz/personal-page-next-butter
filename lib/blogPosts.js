import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";
import kebabCase from "lodash.kebabcase";

const sortByDate = (a, b) => {
  if (a.date < b.date) {
    return 1;
  }
  return -1;
};

const postsDirectory = path.join(process.cwd(), "_content/blog");

let postCache;

const getAllPostsFromLocale = (locale) => {
  const blogPath = `${postsDirectory}/${locale}`;
  const fileNames = fs.readdirSync(blogPath);
  const allPostsData = fileNames
    .filter((it) => it.endsWith(".md"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(blogPath, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      const matterData = matterResult.data;
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.md$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });

  return allPostsData;
};

export function getAllBlogPosts() {
  if (postCache) {
    return postCache;
  }

  postCache = {
    en: getAllPostsFromLocale("en").sort(sortByDate),
    es: getAllPostsFromLocale("es").sort(sortByDate),
  };
  return postCache;
}

export function countPosts(tag) {
  return getAllBlogPosts().filter(
    (it) => !tag || (it.tags && it.tags.includes(tag))
  ).length;
}

export function listPostContent(page, limit, tag) {
  return getAllBlogPosts()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}

export const getPostLocaleBySlug = (slug) => {
  const compareSlug = (el) => el.slug === slug;
  let locale = null;
  const { en, es } = getAllBlogPosts();
  if (en.some(compareSlug)) locale = "en";
  if (es.some(compareSlug)) locale = "es";
  return locale;
};

export const sortAllByLocale = ({ es, en }, loc) => {
  if (loc === "es") return [...es, ...en];
  return [...en, ...es];
};

export function getTableOfContents(content) {
  const regexp = new RegExp(/^(###### |##### |### |## |# )(.*)\n/, "gm");
  const headings = [...content.matchAll(regexp)];

  const getHeadingType = (trimmedHeading) => {
    switch (trimmedHeading) {
      case "#":
        return "H1";
      case "##":
        return "H2";
      case "###":
        return "H3";
      case "####":
        return "H4";
      case "#####":
        return "H5";
      case "######":
        return "H6";
      default:
        return undefined;
    }
  };

  let tableOfContents = [];

  if (headings.length) {
    tableOfContents = headings.map((heading) => {
      const headingText = heading[2].trim();
      const headingLink = kebabCase(headingText);

      return {
        type: getHeadingType(heading[1].trim()),
        title: headingText,
        slug: headingLink,
      };
    });
  }

  return tableOfContents;
}
