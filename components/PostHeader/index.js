import Date from "components/Date";
import PostTitle from "components/PostTitle";

export default function PostHeader({ title, updated, tags, showTags }) {
  return (
    <div>
      <PostTitle>{title}</PostTitle>
      <footer className="post-subtitle">
        <Date dateString={updated} />
        <div className="tags-container">
          {tags.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
