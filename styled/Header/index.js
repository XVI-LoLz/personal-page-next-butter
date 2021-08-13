import style from "./style.module.scss";

export default function Header({ children }) {
  return <h1 className={style.Header}>{children}</h1>;
}
