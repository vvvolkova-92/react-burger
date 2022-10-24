import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
//стили
import styles from "./Modal.module.css";
//сторонние компоненты
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
//мои компоненты
import ModalOverlay from "../ModalOverlay/ModalOverlay";
//константы
import { MODAL } from '../../utils/constants';
import { TModal } from "../../services/types/interfaces";

const Modal: FC<TModal> = ({ closeModal, title, children }) => {

  useEffect( () => {
      function closeByEscape (evt : KeyboardEvent) {
        if (evt.key === "Escape" ) {
          closeModal();
        }
      };
      document.addEventListener("keyup", closeByEscape);
      return  () => document.removeEventListener("keyup", closeByEscape);
    },
    []);

  return createPortal (
    (
      <>
        <ModalOverlay onClose={closeModal}/>
        <div className={styles.container + " pt-10 pr-10 pb-15 pl-10"}>
          <div className={styles.titleBlock}>
            <h2 className={styles.title + " text text_type_main-large"}>{title}</h2>
            <div className={styles.btnClose}>
              <CloseIcon type="primary" onClick={closeModal} />
            </div>
          </div>
          {children}
        </div>
      </>
    )
    , MODAL);

}

export default Modal