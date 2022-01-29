import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

function Modal ({title, children, onCloseBtn}) {

  const MODAL = document.getElementById('modal');
  const [modal, setModal] = useState(false);

  //закрытие окна по кнопочкам
  function closeByEscape (evt) {
    if (evt.key === "Escape" ) {
      setModal(false);
      onCloseBtn();
    }
  }

  useEffect( () => {
    document.addEventListener("keyup", closeByEscape);
    return  () => {document.removeEventListener("keyup", closeByEscape); console.log('clean');}
  }, [modal]);
  
  return createPortal (
    (
      <>
      <ModalOverlay onCloseBtn={onCloseBtn}/>
      <div className={styles.container + " pt-10 pr-10 pb-15 pl-10"}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title + " text text_type_main-large"}>{title}</h2>
          <div className={styles.btnClose}>
          <CloseIcon type="primary" onClick={onCloseBtn} />
          </div>
        </div>
        {children}
      </div>
      </>
    )
    , MODAL);
    
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  onCloseBtn: PropTypes.func.isRequired,
}

export default Modal 