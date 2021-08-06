import cn from "classnames";
import PropTypes from "prop-types";
import style from "./style.module.scss";

export default function SocialNetwork({
  icon: Icon,
  label,
  href,
  showLabel,
  size,
}) {
  return (
    <a
      className={cn(style.SocialNetwork, style[`${label}`])}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {Icon ? <Icon size={size} /> : null}
      {showLabel && label ? <span>{label}</span> : null}
    </a>
  );
}

SocialNetwork.propTypes = {
  size: PropTypes.number,
  showLabel: PropTypes.bool,
};

SocialNetwork.defaultProps = {
  size: 18,
  showLabel: false,
};
