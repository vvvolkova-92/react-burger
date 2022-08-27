import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef, useEffect} from "react";
import styles from './UserInfo.module.css';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import InputName from "../Inputs/InputName";
import InputEmail from "../Inputs/InputEmail";
import InputPassword from "../Inputs/InputPassword";
// import { dontEditProfile } from "../../services/actions/authentication";
// import { editProfile } from "../../services/actions/authentication";

function UserInfo() {
  // const dispatch = useDispatch();
  // const { userName, userEmail, userPassword } = useSelector((state) => state.inputData);
  // const { error, hasError, userData } = useSelector((state) => state.userData);
  // const isEditInfo = (userData.user.email !== userEmail) || (userData.user.name !== userName);
  // console.log(userName, userEmail,userPassword );
  const onClickCancel = () => {
    // dispatch(dontEditProfile(userData));
  }

  const onClickSubmit = () => {
    // dispatch(editProfile(userName, userEmail, userPassword));
  }
  // const buttons = isEditInfo && (<><div className="mt-6"><Button type="primary" size="medium" onClick={onClickSubmit}>Сохранить</Button></div>
  //   <div className="mt-6"><Button type="primary" size="medium" onClick={onClickCancel}>Отмена</Button></div> </>)
  const buttons = (<><div className="mt-6"><Button type="primary" size="medium" onClick={onClickSubmit}>Сохранить</Button></div>
    <div className="mt-6"><Button type="primary" size="medium" onClick={onClickCancel}>Отмена</Button></div> </>)
  return (
    <div className={styles.block__user_info + " mt-30"}>
      <form className={styles.form}>
        <InputName icon={'EditIcon'} type={'profile'}/>
        <InputEmail placeholder={'Логин/Почта'} icon={'EditIcon'} type={'profile'}/>
        <InputPassword/>
      </form>
      {buttons}
    </div>
  )
}

export default UserInfo