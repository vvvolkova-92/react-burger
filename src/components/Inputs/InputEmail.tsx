import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from '../../services/types/hooks';
// сторонние компоненты
// todo: по возможности убрать это!
import { INPUT_USER_EMAIL } from '../../services/types'
import { FC } from 'react';
import { TInputEmail } from "../../services/types/interfaces";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export const InputEmail:FC<TInputEmail> = ({ icon, placeholder, type, value}) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const input = inputRef.current;
  const userEmail = useSelector((state) => state.inputReducer.userEmail);
  // const userData = useSelector((state) => state.userData);
  const [disabled, setDisabled] = useState<boolean>(true);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: INPUT_USER_EMAIL,
      userEmail: e.target.value,
    });
  };

  const onClick = () => {
    if (input!== null) {
      input.disabled = false;
      setDisabled((prev) => !prev);
      input.focus();
    }
  };

  const onBlur = () => {
    if (input!== null) {
      setDisabled(true);
      input.blur();
    }
  };

  return type === 'profile'
    ? (
      <Input type={"email"}
        icon={icon}
        placeholder={placeholder}
        onChange={onChange}
        value={userEmail}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        disabled = {disabled}
        onIconClick ={onClick}
        onBlur={onBlur}
        ref={inputRef}
      />
    )
    : (
      <Input
        type={"email"}
        icon={icon}
        placeholder={placeholder}
        onChange={onChange}
        value={userEmail}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
    )

}

export default InputEmail;