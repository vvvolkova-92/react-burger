import {useEffect} from "react";
import {createPortal} from "react-dom";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import PropTypes from 'prop-types';
//стили
import styles from "./Modal.module.css";
//сторонние компоненты
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
//мои компоненты
import ModalOverlay from "../ModalOverlay/ModalOverlay";
//константы
import {MODAL} from '../../utils/constants';

function Modal ({ closeModal, title, children }) {
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect( () => {
      function closeByEscape (evt) {
        if (evt.key === "Escape" ) {
          closeModal();
          history.replace({ pathname: location.state ? `${location.state.background.pathname}` :`${url}` });
        }
      }
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

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default Modal