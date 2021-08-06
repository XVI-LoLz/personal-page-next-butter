import PropTypes from "prop-types";
import cn from "classnames";
import Link from "next/link";

import { locales } from "utils/locales";
import { useRouter } from "next/router";

import style from "./style.module.scss";

export default function Locales({ hamburger }) {
  const router = useRouter();
  const customClassName = cn(style.Locales, { [style.hamburger]: hamburger });

  return (
    <div className={customClassName}>
      {locales.map((locale) => (
        <Link key={locale} href="/" locale={locale}>
          <a
            className={cn(style.link, {
              [style.active]: router.locale === locale,
            })}
          >
            {locale.toUpperCase()}
          </a>
        </Link>
      ))}
    </div>
  );
}

Locales.propTypes = {
  hamburger: PropTypes.bool,
};

Locales.defaultProps = {
  hamburger: false,
};
