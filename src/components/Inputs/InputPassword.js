import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { INPUT_USER_PASSWORD } from '../../services/types'


function InputPassword({type}) {

  const userPassword = useSelector((state) => state.inputReducer.userPassword);
  const dispatch = useDispatch();

  const onChangeHandler = evt => {
    dispatch({
      type: INPUT_USER_PASSWORD,
      userPassword: evt.target.value,
    });
  };

  return (
    <PasswordInput
      onChange={onChangeHandler}
      value={userPassword}
      name={"password"}
    />
  )
}
export default InputPassword;