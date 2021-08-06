import Logo from "public/logo.svg";

import Socials from "components/Socials";
import Locales from "components/Locales";
import Routes from "./Routes";
import Hamburger from "./Hamburger";

import style from "./style.module.scss";

export default function MainNavbar() {
  return (
    <nav className={style.MainNavbar}>
      <Logo className={style.logo} />
      <Routes style={style} />
      <div className={style.right}>
        <Socials />
        <Locales />
        <Hamburger />
      </div>
    </nav>
  );
}
