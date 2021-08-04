import { FaBars } from "react-icons/fa";

import SocialNetwork from "components/SocialNetwork";

import { socials } from "./constants";

import style from "./style.module.scss";

export default function Socials() {
  return (
    <div className={style.Socials}>
      <div className={style.hamburger}>
        <FaBars />
      </div>
      <div className={style.icons}>
        {socials?.map((social, i) => (
          <SocialNetwork key={i} {...social} />
        ))}
      </div>
    </div>
  );
}
