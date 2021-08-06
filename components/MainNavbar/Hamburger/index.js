import { useState } from "react";
import { FaGripLines, FaWindowClose } from "react-icons/fa";

import Socials from "components/Socials";

import Locales from "components/Locales";
import style from "./style.module.scss";

export default function Hamburger() {
  const [show, setShow] = useState(false);

  const open = () => {
    setShow(true);
  };

  const close = () => setShow(false);

  return (
    <div className={style.Hamburger}>
      <button className={style.disclosure} type="button" onClick={open}>
        <FaGripLines />
      </button>
      {show ? (
        <div
          role="button"
          tabIndex="0"
          className={style.modal}
          onClick={close}
          onKeyDown={() => {}}
        >
          <header className={style.modalHeader}>
            <button className={style.closeButton} type="button" onClick={close}>
              <FaWindowClose />
            </button>
          </header>
          <section className={style.modalBody}>
            <Socials hamburger size={36} />
            <Locales hamburger />
          </section>
        </div>
      ) : null}
    </div>
  );
}
