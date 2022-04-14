import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import { INPUT_USER_NAME } from '../../services/types'

function InputName ({ icon, type }) {
  const [disabled, setDisabled] = useState(true);
  const userName = useSelector((state) => state.inputData.userName);
  const dispatch = useDispatch();

  const onChangeHandler = evt => {
    dispatch({
      //как работает? никак. как вариант описать в экшене логина?
      type: INPUT_USER_NAME,
      userName: evt.target.value,
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
      value={userName}
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
      value={userName}
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
};

