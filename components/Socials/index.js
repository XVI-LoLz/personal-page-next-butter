import PropTypes from "prop-types";
import cn from "classnames";

import SocialNetwork from "components/SocialNetwork";

import { socials } from "./constants";

import style from "./style.module.scss";

export default function Socials({ size, hamburger }) {
  const customClassName = cn(style.Socials, { [style.hamburger]: hamburger });

  return (
    <div className={customClassName}>
      <div className={style.icons}>
        {socials?.map((social, i) => (
          <SocialNetwork key={i} {...social} size={size} />
        ))}
      </div>
    </div>
  );
}

Socials.propTypes = {
  hamburger: PropTypes.bool,
};

Socials.defaultProps = {
  hamburger: false,
};
