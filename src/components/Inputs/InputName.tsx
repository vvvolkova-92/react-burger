import React, { useState, FC } from 'react';
import { useSelector, useAppDispatch } from '../../services/types/hooks';
// сторонние компоненты
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
// todo: по возможности убрать это
import { INPUT_USER_NAME } from '../../services/types'
import { TInputName } from '../../services/types/interfaces';

const InputName: FC<TInputName> = ({ icon, type, value }) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const input = inputRef.current;
  const [disabled, setDisabled] = useState<boolean>(true);
  const userName = useSelector((state) => state.inputReducer.userName);
  const dispatch = useAppDispatch();

  const onChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const allowedСharacters = evt.target.value.replace(/[0-9]/g, "");
    dispatch({
      type: INPUT_USER_NAME,
      userName: allowedСharacters,
    });
  };

  const onClick = () => {
    if (input!== null) {
      input.disabled = false;
      setDisabled((prev) => !prev);
      input.focus();
    }
    
  }

  const onBlur = () => {
    if (input!== null) {
      setDisabled(true);
      input.blur();
    }

  }

  return type === 'profile'
    ? (
      <Input
        icon={icon}
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeHandler}
        value={userName}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        disabled={disabled}
        onIconClick ={onClick}
        onBlur ={onBlur}
        ref={inputRef}
      />
    )
    : (
      <Input
        icon={icon}
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeHandler}
        value={userName}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        ref={inputRef}
      />
    )
}

export default InputName
