import PropTypes from "prop-types";
import cn from "classnames";

import { locales } from "utils/locales";
import { useRouter } from "next/router";

import style from "./style.module.scss";

export default function Locales({ hamburger }) {
  const router = useRouter();
  const customClassName = cn(style.Locales, { [style.hamburger]: hamburger });

  return (
    <div className={customClassName}>
      {locales.map((locale) => (
        <button
          className={style.button}
          type="button"
          key={locale}
          onClick={() => router.push("", null, { locale })}
        >
          <span
            className={cn(style.link, {
              [style.active]: router.locale === locale,
            })}
          >
            {locale.toUpperCase()}
          </span>
        </button>
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
