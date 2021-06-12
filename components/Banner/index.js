import style from "./style.module.scss";

export default function Banner() {
  return (
    <div className={style.Banner}>
      <div className={style.descriptionContainer}>
        <img className={style.clippedLogo} src="images/me.jpg" alt="logo" />
        <div className={style.description}>
          <header className={style.header}>
            Hola, soy <span className={style.blue}>LoLz</span>
          </header>
          <h1 className={style.introduction}>Web/Game Dev & Streamer.</h1>
          <a
            className={style.cta}
            href="https://16th.me/twitch"
            target="_blank"
            rel="noreferrer"
          >
            Acompáñame en Twitch
          </a>
        </div>
      </div>
      <img className={style.background} src="images/banner.png" alt="banner" />
    </div>
  );
}
