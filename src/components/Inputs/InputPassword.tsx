import React, {FC, useState} from "react";
import {Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { INPUT_USER_PASSWORD } from '../../services/types'
import { useSelector, useAppDispatch } from "../../services/types/hooks";
import { TInputPassword } from '../../services/types/interfaces';

const InputPassword:FC<TInputPassword> = ({ type }) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const input = inputRef.current;
  const [disabled, setDisabled] = useState(true);
  const userPassword = useSelector((state) => state.inputReducer.userPassword);
  const dispatch = useAppDispatch();

  const onChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const allowedСharacters = evt.target.value.replace(/[^a-zA-Z0-9]/g,'');
    dispatch({
      type: INPUT_USER_PASSWORD,
      userPassword: allowedСharacters,
    });
  };

  const onClick = () => {
    if (input) {
      input.disabled = false;
      setDisabled((prev) => !prev);
      input.focus();
    }
  };

  const onBlur = () => {
    setDisabled(true);
    if (input) {
      input.blur();
    }
  };

  return type === 'profile' ?
    (
      <Input
        icon={'EditIcon'}
        type={"password"}
        placeholder={"Новый пароль"}
        onChange={onChangeHandler}
        value={userPassword}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        disabled = {disabled}
        onIconClick ={onClick}
        onBlur ={onBlur}
        ref={inputRef}
      />
    )
      :
  (
    <PasswordInput
      onChange={onChangeHandler}
      value={userPassword}
      name={"password"}
    />
  )
}
export default InputPassword;