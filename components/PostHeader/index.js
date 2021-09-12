import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import cn from "classnames";

import PostDate from "components/PostDate";
import { Header } from "styled";

import style from "./style.module.scss";

export default function PostHeader({
  title,
  created,
  updatedDate,
  tags,
  featuredImage,
  locale,
}) {
  const { locale: siteLocale } = useRouter();

  const isCurrentLocale = siteLocale.toLowerCase() === locale.toLowerCase();

  return (
    <div className={style.PostHeader}>
      <header className={style.header}>
        <Header>{title}</Header>
      </header>
      <div className="post-subtitle">
        <PostDate created={created} updated={updatedDate} />
        <div className="tags-container">
          {tags?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <span
            className={cn(style.localeTag, {
              [style.current]: isCurrentLocale,
            })}
          >
            {locale}
          </span>
        </div>
      </div>
      {featuredImage ? (
        <Image
          src={`/${featuredImage.src}`}
          alt={featuredImage.alt}
          width={1200}
          height={627}
        />
      ) : null}
    </div>
  );
}

PostHeader.propTypes = {
  title: PropTypes.string,
  updatedDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  created: PropTypes.string,
  featuredImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  locale: PropTypes.string,
};

PostHeader.defaultProps = {
  title: "",
  updatedDate: "",
  tags: [],
  created: "",
  featuredImage: [],
  locale: "",
};
