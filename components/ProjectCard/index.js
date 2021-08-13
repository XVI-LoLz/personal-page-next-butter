import cn from "classnames";
import useTranslation from "next-translate/useTranslation";

import style from "./style.module.scss";

export default function ProjectCard({ href, label, src, wip }) {
  const { t } = useTranslation("common");

  const Wrapper = ({ children }) => {
    if (wip) return <div className={style.wrapper}>{children}</div>;

    return (
      <a className={style.wrapper} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  };

  const customClassName = cn(style.ProjectCard, { [style.wip]: wip });

  return (
    <Wrapper>
      <article className={customClassName}>
        <img className={style.cardBackground} src={src} alt={`${label} card`} />
        <span className={style.cardLabel}>{label}</span>
        {wip ? (
          <span className={style.wipLabel} title={t`wip`}>
            {t`wip`}
          </span>
        ) : null}
      </article>
    </Wrapper>
  );
}
