import PropTypes from "prop-types";

import style from "./style.module.scss";

export default function Card({ header, children, cta, onCTA }) {
  return (
    <article className={style.Card}>
      <header className={style.cardHeader}>{header}</header>
      <p className={style.cardDescription}>{children}</p>
      <button type="button" className={style.cardCta} onClick={onCTA}>
        {cta}
      </button>
    </article>
  );
}

Card.propTypes = {
  cta: PropTypes.string,
  onCTA: PropTypes.func,
};

Card.defaultProps = {
  cta: "Ver más",
  onCTA: () => {},
};
