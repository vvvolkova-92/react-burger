import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Modal ({title, children, closeBtn} : any) {

  const MODAL = document.getElementById('modal')!;
  const [modal, setModal] = useState(false);

  //закрытие окна по кнопочкам
  function closeByEscape (evt : any) {
    if (evt.key === "Escape" ) {
      setModal(false);
    }
  }

  useEffect( () => {
    document.addEventListener("keyup", closeByEscape);
  }, []);
  
  return createPortal (
    (
      <>
      <ModalOverlay closeBtn={closeBtn}/>
      <div className={styles.container + " pt-10 pr-10 pb-15 pl-10"}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title + " text text_type_main-large"}>{title}</h2>
          <div className={styles.btnClose}>
          <CloseIcon type="primary" onClick={closeBtn} />
          </div>
        </div>
        {children}
      </div>
      </>
    )
    , MODAL);
    
}

export default Modal 