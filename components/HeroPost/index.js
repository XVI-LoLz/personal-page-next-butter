import Avatar from "components/Avatar";
import Date from "components/Date";
import CoverImage from "components/CoverImage";
import Link from "next/link";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <CoverImage title={title} url={coverImage} slug={slug} />
      <h3>
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a>{title}</a>
        </Link>
      </h3>
      <Date dateString={date} />
      <p>{excerpt}</p>
      <Avatar
        name={`${author.first_name} ${author.last_name}`}
        picture={author.profile_image}
      />
    </section>
  );
}
