import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { INPUT_USER_NAME } from '../../services/types'

function InputName () {

  const userName = useSelector((state) => state.inputData.userName);
  const dispatch = useDispatch();

  const onChangeHandler = evt => {
    console.log('userName');
    console.log(userName);
    dispatch({
      //как работает? никак. как вариант описать в экшене логина?
      type: INPUT_USER_NAME,
      userName: evt.target.value,
    });
  };
  return (
    <Input
      // icon={icon}
      type={"text"}
      placeholder={"Имя"}
      onChange={onChangeHandler}
      value={userName}
      name={"name"}
      error={false}
      errorText={"Ошибка"}
      size={"default"}
    />
  );
}

export default InputName

// InputName.propTypes = {
//   icon: PropTypes.string,
// };

