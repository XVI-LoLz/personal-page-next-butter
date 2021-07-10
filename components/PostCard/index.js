import Date from "components/Date";
import Link from "next/link";

import style from "./style.module.scss";

export default function PostCard({ title, published, summary, slug }) {
  return (
    <article className={style.PostCard}>
      <header className={style.cardHeader}>{title}</header>
      <p className={style.cardDescription}>{summary}</p>
      <footer className={style.cardFooter}>
        <Date dateString={published} />
        <Link href={`/blog/${encodeURIComponent(slug)}`}>
          <a className={style.cardCta}>Ver más</a>
        </Link>
      </footer>
    </article>
  );
}
