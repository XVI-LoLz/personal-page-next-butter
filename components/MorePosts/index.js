import PostCard from "components/PostCard";

export default function MorePosts({ posts }) {
  return (
    <div className="posts-container">
      {posts.length > 0 &&
        posts?.map((post) => <PostCard key={post.slug} {...post} />)}
    </div>
  );
}
