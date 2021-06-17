import cn from "classnames";
import style from "./style.module.scss";

export default function Info({ children, align }) {
  return <p className={cn(style.Info, style[`${align}`])}>{children}</p>;
}
