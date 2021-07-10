import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

import Socials from "components/Socials";

import Logo from "public/logo.svg";
import style from "./style.module.scss";

import { routes } from "./constants";

export default function MainNavbar() {
  const { pathname } = useRouter();
  return (
    <nav className={style.MainNavbar}>
      <Logo className={style.logo} />
      <ul className={style.links}>
        {routes?.map(({ route, es }, i) => (
          <li key={i}>
            <Link href={route}>
              <a
                className={cn(style.link, {
                  [style.active]:
                    i === 0
                      ? pathname.length === route.length
                      : pathname.startsWith(route),
                })}
              >
                {es}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Socials />
    </nav>
  );
}
