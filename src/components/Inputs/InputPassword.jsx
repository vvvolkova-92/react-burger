import { useDispatch, useSelector } from "react-redux";
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { INPUT_USER_PASSWORD } from '../../services/types'

function InputPassword() {
  const userPassword = useSelector((state) => state.inputData.userPassword);
  const dispatch = useDispatch();
  const onChangeHandler = evt => {
    dispatch({
      //как работает? никак. как вариант описать в экшене логина?
      type: INPUT_USER_PASSWORD,
      userPassword: evt.target.value,
    });
  };
  return (
    <PasswordInput onChange={onChangeHandler} value={userPassword} name={"password"}/>
  );
}
export default InputPassword