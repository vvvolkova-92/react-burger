import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef} from "react";
import styles from './UserInfo.module.css';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import InputName from "../Inputs/InputName";
import InputEmail from "../Inputs/InputEmail";
import InputPassword from "../Inputs/InputPassword";

function UserInfo() {
  const { userName, userEmail, userPassword } = useSelector((state) => state.inputData);
  const { error, hasError, userData } = useSelector((state) => state.userData);
  
  //ТУДУ ф-ия изменения данных
  const onIconClick = () => {
    alert('Временно')
  }
  return (
    <div className={styles.block__user_info + " mt-30"}>
      <form className={styles.form}>
        <InputName icon={'EditIcon'}/>
        <InputEmail placeholder={'Логин/Почта'} icon={'EditIcon'}/>
        <InputPassword />
        </form>
    </div>
  )
}

export default UserInfo