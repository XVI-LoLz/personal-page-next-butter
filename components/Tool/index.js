import Link from "next/link";
import PropTypes from "prop-types";
import cn from "classnames";

import Chevron from "public/icons/ic_right_chevron.svg";

import style from "./style.module.scss";

export default function Tool({
  id,
  slug,
  title,
  url,
  logoUrl,
  type,
  description,
}) {
  return (
    <article className={cn(style.Tool, title)}>
      <div className={style.toolLogoContainer}>
        <a title="Ir al sitio" href={url} target="_blank" rel="noreferrer">
          <img
            className={style.toolLogo}
            src={logoUrl}
            alt={`${slug}-logo`}
            width={80}
          />
        </a>
      </div>

      <section className={style.contentWrapper}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.type}>{type}</p>
        <p className={style.descriptionLabel}>Descripción</p>
        <p className={style.description}>{description}</p>
        <Link key={id} href="/tools/[slug]" as={`/tools/${slug}`}>
          <a className={style.goTo} title="Conoce mi opinión">
            <Chevron />
          </a>
        </Link>
      </section>
    </article>
  );
}

Tool.propTypes = {
  id: PropTypes.string.isRequired,
  // files: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  url: PropTypes.string,
  logoUrl: PropTypes.string,
  slug: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
};

Tool.defaultProps = {
  // files: [],
  title: null,
  url: "",
  logoUrl: "",
  slug: null,
  type: null,
  description: null,
};
