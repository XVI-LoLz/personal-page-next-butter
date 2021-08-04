import cn from "classnames";
import PropTypes from "prop-types";
import style from "./style.module.scss";

export default function SocialNetwork({ icon: Icon, label, href, showLabel }) {
  return (
    <a
      className={cn(style.SocialNetwork, style[`${label}`])}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {Icon ? <Icon size={18} /> : null}
      {showLabel && label ? <span>{label}</span> : null}
    </a>
  );
}

SocialNetwork.propTypes = {
  showLabel: PropTypes.bool,
};

SocialNetwork.defaultProps = {
  showLabel: false,
};
