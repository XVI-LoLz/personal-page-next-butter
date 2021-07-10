import SocialNetwork from "components/SocialNetwork";

import { socials } from "./constants";

import style from "./style.module.scss";

export default function Socials() {
  return (
    <div className={style.Socials}>
      {socials?.map((social, i) => (
        <SocialNetwork key={i} {...social} />
      ))}
    </div>
  );
}
