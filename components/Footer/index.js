import useTranslation from "next-translate/useTranslation";
import style from "./style.module.scss";

export default function Footer() {
  const { t } = useTranslation("common");
  return (
    <footer className={style.Footer}>
      <div className={style.attribution}>
        <span className={style.attributionLabel}>{t`footer.attribution`}</span>
        <img
          className={style.attributionImage}
          src="https://cdn.buttercms.com/RyJ7UhcVTCRqrCFXwgCo"
          alt="ButterCMS logo"
        />
      </div>
    </footer>
  );
}
