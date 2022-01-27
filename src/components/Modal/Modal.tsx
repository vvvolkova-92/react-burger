import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const MODAL = document.getElementById('modal')!;

function Modal ({title, children} : any) {

  const [modal, setModal] = useState(false);
  //закрытие окна по кнопочкам
  function closeByEscape (evt : any) {
    if (evt.key === "Escape" ) {
      setModal(false);
    }
  }

  const close = () => {
    console.log(modal);
    return setModal(false);
  }

  //навесить слушатель (когда снять?!)
  useEffect( () => {
    document.addEventListener("keyup", closeByEscape);
  }, []);
  
  //рендер через портал и модаловерлей
  return createPortal (
    //разметка
    (
      <>
      <ModalOverlay close={close}/>
      <div className={styles.container + " pt-10 pr-10 pb-15 pl-10"}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title + " text text_type_main-large"}>{title}</h2>
          <div className={styles.btnClose}>
          <CloseIcon type="primary" onClick={() => {setModal(false)}} />
          </div>
        </div>
        {children}
      </div>
      </>
    )
    , MODAL);
    
}

export default Modal 