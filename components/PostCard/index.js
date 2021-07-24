import PropTypes from "prop-types";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import PostDate from "components/PostDate";

import { locales } from "utils/locales";
import style from "./style.module.scss";

export default function PostCard({
  title,
  published,
  updated,
  summary,
  slug,
  categories,
}) {
  const { t } = useTranslation("common");

  const locale = categories.find((el) => locales.includes(el.slug)).name;

  return (
    <article className={style.PostCard}>
      <header className={style.cardHeader}>
        <span>{title}</span>
        {locale ? <span>{locale}</span> : null}
      </header>
      <p className={style.cardDescription}>{summary}</p>
      <footer className={style.cardFooter}>
        <PostDate published={published} updated={updated} />
        <Link href={`/blog/${encodeURIComponent(slug)}`}>
          <a className={style.cardCta}>{t`postCard.cta`}</a>
        </Link>
      </footer>
    </article>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
