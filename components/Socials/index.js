import SocialNetwork from "components/SocialNetwork";

import style from "./style.module.scss";

import { socials } from "./constants";

export default function Socials() {
  return (
    <div className={style.Socials}>
      {socials.map((social, i) => (
        <SocialNetwork key={i} {...social} />
      ))}
    </div>
  );
}
