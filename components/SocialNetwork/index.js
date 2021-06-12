import style from "./style.module.scss";

export default function SocialNetwork({ icon: Icon, label, href }) {
  return (
    <a className={style} href={href} target="_blank" rel="noreferrer">
      {Icon ? <Icon size={16} /> : null}
      {label ? <span>{label}</span> : null}
    </a>
  );
}
