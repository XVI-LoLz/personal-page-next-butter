import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import useTranslation from "next-translate/useTranslation";
import { FaBlog, FaBookReader, FaHome } from "react-icons/fa";

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
      icon: FaHome,
    },
    {
      route: "/blog",
      label: t`navbar.blog`,
      icon: FaBlog,
    },
    {
      route: "/resources",
      label: t`navbar.resources`,
      icon: FaBookReader,
    },
  ];

  return (
    <nav className={style.MainNavbar}>
      <Logo className={style.logo} />
      <ul className={style.links}>
        {routes?.map(({ route, label, icon: Icon }, i) => (
          <li key={i}>
            <Link href={route}>
              <a
                className={cn(style.link, {
                  [style.active]:
                    i === 0
                      ? pathname.length === route.length
                      : pathname.startsWith(route),
                })}
                title={label}
              >
                <span className={style.label}>{label}</span>
                <Icon className={style.icon} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Socials />
    </nav>
  );
}
