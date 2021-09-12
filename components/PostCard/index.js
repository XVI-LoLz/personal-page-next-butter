import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import cn from "classnames";

import PostDate from "components/PostDate";

import style from "./style.module.scss";

export default function PostCard({
  title,
  created,
  updatedDate,
  summary,
  slug,
  locale,
}) {
  const { t } = useTranslation("common");

  const { locale: siteLocale } = useRouter();

  const isCurrentLocale = siteLocale.toLowerCase() === locale.toLowerCase();

  return (
    <article className={style.PostCard}>
      <header className={style.cardHeader}>
        <span>{title}</span>
        {locale ? (
          <span
            className={cn(style.locale, {
              [style.current]: isCurrentLocale,
            })}
          >
            {locale}
          </span>
        ) : null}
      </header>
      <p className={style.cardDescription}>{summary}</p>
      <footer className={style.cardFooter}>
        <PostDate created={created} updated={updatedDate} />
        <Link href={`/blog/${encodeURIComponent(slug)}`}>
          <a className={style.cardCta}>{t`postCard.cta`}</a>
        </Link>
      </footer>
    </article>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  updatedDate: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};
