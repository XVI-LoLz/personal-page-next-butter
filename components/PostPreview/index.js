import Avatar from "components/Avatar";
import Date from "components/Date";
import CoverImage from "components/CoverImage";
import Link from "next/link";

export default function PostPreview({
  title,
  coverImage,
  date,
  summary,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} url={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{summary}</p>
      <Avatar
        name={`${author.first_name} ${author.last_name}`}
        picture={author.profile_image}
      />
    </div>
  );
}
