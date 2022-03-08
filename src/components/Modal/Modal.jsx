import {useEffect} from "react";
import {createPortal} from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {MODAL} from '../../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import { closeModal } from '../../services/actions/modalAction';


function Modal ({ title, children }) {
  const {close} = useSelector (store => store.modalReducer);
  const dispatch = useDispatch ();
  useEffect( () => {
    function closeByEscape (evt) {
      if (evt.key === "Escape" ) {
        dispatch( closeModal() )
      }
    }
    document.addEventListener("keyup", closeByEscape);
    return  () => document.removeEventListener("keyup", closeByEscape);
    }, 
    []);
  
  return createPortal (
    (
      <>
      <ModalOverlay onClose={() => dispatch(closeModal())}/>
      <div className={styles.container + " pt-10 pr-10 pb-15 pl-10"}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title + " text text_type_main-large"}>{title}</h2>
          <div className={styles.btnClose}>
          <CloseIcon type="primary" onClick={() => dispatch(closeModal())} />
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
}

export default Modal 