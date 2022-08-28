import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
// сторонние компоненты
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
// todo: по возможности убрать это
import { INPUT_USER_NAME } from '../../services/types'

function InputName ({ icon, type, value }) {
  const [disabled, setDisabled] = useState(true);
  const userName = useSelector((state) => state.inputReducer.userName);
  const dispatch = useDispatch();

  const onChangeHandler = evt => {
    const allowedСharacters = evt.target.value.replace(/[0-9]/g, "");
    dispatch({
      type: INPUT_USER_NAME,
      userName: allowedСharacters,
    });
  };

  const onClick = () => {
    setDisabled(prev => !prev);
  }

  const onBlur = () => {
    setDisabled(true);
  }

  return type === 'profile'
    ? (
      <Input
        icon={icon}
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeHandler}
        value={value ? value : userName}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        disabled = {disabled}
        onIconClick ={onClick}
        onBlur ={onBlur}
      />
    )
    : (
      <Input
        icon={icon}
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeHandler}
        value={value ? value : userName}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
    )
}

export default InputName

InputName.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};