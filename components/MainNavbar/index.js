import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

import Socials from "components/Socials";

import Logo from "public/logo.svg";
import style from "./style.module.scss";

import { routes } from "./constants";

export default function Nav() {
  const { pathname } = useRouter();
  return (
    <nav className={style}>
      <Logo className="logo" />
      <ul className="links">
        {routes.map(({ route, es }, i) => (
          <li key={i}>
            <Link href={route}>
              <a
                className={cn("link", {
                  "-active":
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
