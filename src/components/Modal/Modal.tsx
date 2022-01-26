import {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
function Modal (title: any) {
  const [modal, setModal] = useState(false);
  //закрытие окна по кнопочкам
  function closeByEscape (evt : any) {
    if (evt.key === "Escape" ) {
      setModal(false);
    }
  }
  //навесить слушатель (когда снять?!)
  useEffect( () => {
    document.addEventListener("keyup", closeByEscape);
  })
  //рендер через портал и модаловерлей
}

export default Modal 