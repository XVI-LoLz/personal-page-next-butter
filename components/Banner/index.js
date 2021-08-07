import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";

import style from "./style.module.scss";

export default function Banner() {
  const { t } = useTranslation("home");

  return (
    <div className={style.Banner}>
      <div className={style.descriptionContainer}>
        <img className={style.clippedLogo} src="images/me-min.jpg" alt="logo" />
        <div className={style.description}>
          <header className={style.header}>
            <Trans
              i18nKey="home:greeting"
              components={[<span className={style.name} />]}
            />
          </header>
          <p className={style.introduction}>
            Web Dev &<br /> Game Dev
          </p>
          {/* <a
            className={style.cta}
            href="https://16th.me/twitch"
            target="_blank"
            rel="noreferrer"
          >
            {t`twitch`}
          </a> */}
        </div>
      </div>
      <img className={style.background} src="images/banner.png" alt="banner" />
    </div>
  );
}
