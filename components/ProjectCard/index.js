import style from "./style.module.scss";

export default function ProjectCard({ href, label, src }) {
  return (
    <article className={style.ProjectCard}>
      <a href={href} target="_blank" rel="noreferrer">
        <img className={style.cardBackground} src={src} alt={`${label} card`} />
        <h4 className={style.cardLabel}>{label}</h4>
      </a>
    </article>
  );
}
