import { useDispatch, useSelector } from "react-redux";
import {useRef, useState} from "react";
import {Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { INPUT_USER_PASSWORD } from '../../services/types'


function InputPassword({type}) {
  const inputRef = useRef();
  const input = inputRef.current;
  const [disabled, setDisabled] = useState(true);
  const userPassword = useSelector((state) => state.inputReducer.userPassword);
  const dispatch = useDispatch();

  const onChangeHandler = evt => {
    const allowedСharacters = evt.target.value.replace(/[^a-zA-Z0-9]/g,'');
    dispatch({
      type: INPUT_USER_PASSWORD,
      userPassword: allowedСharacters,
    });
  };

  const onClick = () => {
    input.disabled = false;
    setDisabled((prev) => !prev);
    input.focus();
  };

  const onBlur = () => {
    setDisabled(true);
    input.blur();
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