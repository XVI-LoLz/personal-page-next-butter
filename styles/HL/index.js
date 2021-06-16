import style from "./style.module.scss";

export default function HL({ children }) {
  return <span className={style.HL}>{children}</span>;
}
