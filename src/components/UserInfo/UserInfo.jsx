import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef} from "react";
import styles from './UserInfo.module.css';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import InputName from "../Inputs/InputName";
import InputEmail from "../Inputs/InputEmail";
import InputPassword from "../Inputs/InputPassword";
import { dontEditProfile } from "../../services/actions/authentication";
import { editProfile } from "../../services/actions/authentication";
function UserInfo() {
  const { userName, userEmail, userPassword } = useSelector((state) => state.inputData);
  const { error, hasError, userData } = useSelector((state) => state.userData);
  const isEditInfo = (userData.user.email !== userEmail) || (userData.user.name !== userName);

  const onClickCancel = () => {
    dontEditProfile(userData);
  }

  const onClickSubmit = () => {
    editProfile(); //написать ф-ю
  }

  return (
    <div className={styles.block__user_info + " mt-30"}>
      <form className={styles.form}>
        <InputName icon={'EditIcon'} type={'profile'}/>
        <InputEmail placeholder={'Логин/Почта'} icon={'EditIcon'} type={'profile'}/>
        <InputPassword/>
        </form>
        {isEditInfo && (<><div className="mt-6"><Button type="primary" size="medium" onClick={onClickSubmit}>Сохранить</Button></div>
        <div className="mt-6"><Button type="primary" size="medium" onClick={onClickCancel}>Отмена</Button></div> </>)
        }
    </div>
  )
}

export default UserInfo