import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
// сторонние компоненты
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
// todo: по возможности убрать это!
import { INPUT_USER_EMAIL } from '../../services/types'

export function InputEmail({ icon, placeholder, type}) {
  const userEmail = useSelector((state) => state.inputReducer.userEmail);
  // const userData = useSelector((state) => state.userData);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch({
      type: INPUT_USER_EMAIL,
      userEmail: e.target.value,
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
        type={"email"}
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

InputEmail.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default InputEmail;