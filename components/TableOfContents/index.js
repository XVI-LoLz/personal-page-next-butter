import Link from "next/link";
import { useState } from "react";
import PropTypes from "prop-types";
import useTranslation from "next-translate/useTranslation";
import cn from "classnames";

import useScrollToHashOnLoad from "hooks/use-hash-on-load";

import { FaMinus, FaStream } from "react-icons/fa";
import style from "./style.module.scss";

export default function TableOfContents({ content }) {
  const [show, setShow] = useState(false);
  const { t } = useTranslation("common");
  useScrollToHashOnLoad();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  if (content?.length < 1) {
    return null;
  }

  return (
    // ! wrapper important for sticky position inside grid
    <div className={style.tocWrapper}>
      <button
        type="button"
        className={style.showButton}
        onClick={show ? close : open}
      >
        {show ? <FaMinus /> : <FaStream />}
      </button>
      <nav
        className={cn(style.TableOfContents, { [style.show]: show })}
        onClick={show ? close : () => {}}
        onKeyPress={() => {}}
      >
        <header>
          <button
            className={style.headerButton}
            type="button"
            onClick={scrollToTop}
          >
            {t`toc`}
          </button>
        </header>
        <ul>
          {content?.map(({ type, label, slug }) => (
            <Link href={{ hash: slug }} replace>
              <li
                key={slug}
                className={style[type]}
                onClick={close}
                onKeyPress={() => {}}
              >
                <a>{label}</a>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}

TableOfContents.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({})),
};

TableOfContents.defaultProps = {
  content: [],
};
