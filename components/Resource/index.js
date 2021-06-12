import PropTypes from "prop-types";
import cn from "classnames";

import LinkIcon from "public/icons/link.svg";
import RocketIcon from "public/icons/rocket.svg";
import LanguageIcon from "public/icons/language.svg";
import ShakeIcon from "public/icons/shake.svg";
import MoneyIcon from "public/icons/money.svg";

import style from "./style.module.scss";

const Category = ({ className, label, icon: Icon, children }) => (
  <div className={cn(style.Category, className)}>
    <header className={style.header}>
      <Icon className={style.icon} />
      <span className={style.title}>{label}</span>
    </header>
    <div className={style.valuesWrapper}>{children}</div>
  </div>
);

export default function Resource({
  title,
  link,
  topics,
  languages,
  modalities,
  activities,
}) {
  return (
    <div className="resource-wrapper">
      <article className={style.Resource}>
        <h3 className={style.resourceTitle}>
          <a href={link} target="_blank" rel="noreferer noreferrer">
            <span className={style.titleText}>{title}</span>
            <LinkIcon className="category-icon" />
          </a>
        </h3>

        <Category className="topics" label="Temas:" icon={RocketIcon}>
          {topics.map((el, i) => (
            <p key={i} className={style.value}>
              {el}
            </p>
          ))}
        </Category>
        <Category className="languages" label="Idiomas:" icon={LanguageIcon}>
          {languages.map((el, i) => (
            <p key={i} className={style.value}>
              {el}
            </p>
          ))}
        </Category>
        <Category className="activities" label="Estrategia" icon={ShakeIcon}>
          {activities.map((el, i) => (
            <p key={i} className={style.value}>
              {el}
            </p>
          ))}
        </Category>
        <Category className="modalities" label="Modalidades" icon={MoneyIcon}>
          {modalities.map((el, i) => (
            <p key={i} className={style.value}>
              {el}
            </p>
          ))}
        </Category>
      </article>
      <a className={style.cta} href={link} target="_blank" rel="noreferrer">
        <h4>Visitar</h4>
      </a>
    </div>
  );
}

Resource.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.string),
  languages: PropTypes.arrayOf(PropTypes.string),
  modalities: PropTypes.arrayOf(PropTypes.string),
  activities: PropTypes.arrayOf(PropTypes.string),
};

Resource.defaultProps = {
  topics: [],
  languages: [],
  modalities: [],
  activities: [],
};
