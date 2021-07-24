import Butter from "buttercms";

const butter = Butter(process.env.BUTTERCMS_API_KEY);

export async function getPreviewPostBySlug(slug) {
  const postResponse = await butter.post.retrieve(slug, {
    preview: 1,
  });
  return postResponse?.data?.data;
}

export async function getAllPostsWithSlug() {
  // https://buttercms.com/docs/api/node?javascript#get-your-blog-posts
  const response = await butter.post.list();
  return response?.data?.data;
}

export async function getAllPostsForHome(preview, locale) {
  const response = await butter.post.list({
    preview: preview ? 1 : 0,
    category_slug: locale || undefined,
    exclude_body: true,
  });
  return response?.data?.data;
}

export async function getPostAndMorePosts(slug, preview) {
  const postResponse = await butter.post.retrieve(slug, {
    preview: preview ? 1 : 0,
  });
  const postListResponse = await butter.post.list();
  return {
    post: postResponse?.data?.data,
    morePosts: postListResponse?.data?.data.filter(
      ({ slug: postSlug }) => postSlug !== slug
    ),
  };
}

const projectsForHomeParams = {
  page: "1",
  page_size: "10",
  locale: "es",
};

export async function getProjectsForHome() {
  const response = await butter.content.retrieve(
    ["projects"],
    projectsForHomeParams
  );
  return response?.data?.data.projects;
}

export async function getAllBlogCategories() {
  const response = await butter.category.list();
  return response?.data?.data;
}

const params = {
  locale: "es",
};

export async function getAllResources() {
  const response = await butter.content.retrieve(["resources"], params);
  return response?.data?.data.resources;
}
