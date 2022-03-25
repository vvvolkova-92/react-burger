import { useDispatch, useSelector } from "react-redux";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import { INPUT_USER_EMAIL } from '../../services/types'

export function InputEmail({ icon, placeholder }) {
  const userEmail = useSelector((state) => state.inputData.userEmail);
  const userData = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const onChange = (e) => {

    dispatch({
      type: INPUT_USER_EMAIL,
      userEmail: e.target.value,
    });
  };
  return (
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
  );
}

InputEmail.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputEmail;