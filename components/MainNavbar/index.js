import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import useTranslation from "next-translate/useTranslation";

import Socials from "components/Socials";

import Logo from "public/logo.svg";
import style from "./style.module.scss";

export default function MainNavbar() {
  const { pathname } = useRouter();
  const { t } = useTranslation("common");

  const routes = [
    {
      route: "/",
      label: t`navbar.home`,
    },
    {
      route: "/blog",
      label: t`navbar.blog`,
    },
    {
      route: "/recursos",
      label: t`navbar.resources`,
    },
  ];

  return (
    <nav className={style.MainNavbar}>
      <Logo className={style.logo} />
      <ul className={style.links}>
        {routes?.map(({ route, label }, i) => (
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
                {label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Socials />
    </nav>
  );
}
