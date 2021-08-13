import PropTypes from "prop-types";
import { useRouter } from "next/router";
import cn from "classnames";

import { getLocaleFromCategories } from "utils/locales";

import PostDate from "components/PostDate";
import { Header } from "styled";

import style from "./style.module.scss";

export default function PostHeader({
  title,
  published,
  updated,
  tags,
  featured_image: ftImage,
  featured_image_alt: ftImageAlt,
  categories,
}) {
  const { locale } = useRouter();
  const postLocale = getLocaleFromCategories(categories);

  const isCurrentLocale = locale.toLowerCase() === postLocale.toLowerCase();

  return (
    <div className={style.PostHeader}>
      <header className={style.header}>
        <Header>{title}</Header>
      </header>
      <div className="post-subtitle">
        <PostDate published={published} updated={updated} />
        <div className="tags-container">
          {tags?.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}{" "}
          <span
            className={cn(style.localeTag, {
              [style.current]: isCurrentLocale,
            })}
          >
            {postLocale}
          </span>
        </div>
      </div>
      {ftImage ? <img src={ftImage} alt={ftImageAlt} layout="fill" /> : null}
    </div>
  );
}

PostHeader.propTypes = {
  title: PropTypes.string,
  updated: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({})),
  featured_image: PropTypes.string,
  featured_image_alt: PropTypes.string,
};

PostHeader.defaultProps = {
  title: "",
  updated: "",
  tags: [],
  featured_image: "",
  featured_image_alt: "",
};
