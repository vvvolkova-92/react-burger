import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {MODAL} from '../../constants/constants';

function Modal ({title, children, onClose}) {

  useEffect( () => {
    function closeByEscape (evt) {
      if (evt.key === "Escape" ) {
      }
    }
    document.addEventListener("keyup", closeByEscape);
    return  () => document.removeEventListener("keyup", closeByEscape);
    }, 
    [onClose]);
  
  return createPortal (
    (
      <>
      <ModalOverlay onClose={onClose}/>
      <div className={styles.container + " pt-10 pr-10 pb-15 pl-10"}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title + " text text_type_main-large"}>{title}</h2>
          <div className={styles.btnClose}>
          <CloseIcon type="primary" onClick={onClose} />
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
  onClose: PropTypes.func.isRequired,
}

export default Modal 