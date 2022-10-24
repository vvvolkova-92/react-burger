import { useDispatch } from "react-redux";
import { FC } from "react";
import { useSelector } from "../../services/types/hooks";
import { Link, useHistory, BrowserRouter } from 'react-router-dom';
// сторонние компоненты
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
// мои компоненты
import { userRegistration } from '../../services/actions/authenticationAction';
import InputName from "../../components/Inputs/InputName";
import InputPassword from "../../components/Inputs/InputPassword";
import InputEmail from "../../components/Inputs/InputEmail";
//вспомогательные функции
import { getMessage } from '../../utils/constants';
// стили
import styles from './Registration.module.css';


export const Registration: FC = () => {
  const { hasError, error} = useSelector( store => store.registrationUserReducer);
  const errorText = getMessage(error!);
  const dispatch = useDispatch();
  const inputData = useSelector(store => store.inputReducer);
  let history = useHistory();

  function onSubmitHandler () {
    dispatch(userRegistration(inputData, history));
    console.log(errorText);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Регистрация</h1>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <InputName />
          <InputEmail placeholder={'Email'}/>
          <InputPassword />
          <div className={styles.button_container}>
            <Button type="primary" size="medium">Зарегистрироваться</Button>
          </div>
        </form>
        {hasError && <span className={styles.error}>{errorText}</span>}
      </div>
      <div className={styles.actions + ' text text_type_main-default text_color_inactive mt-20'}>
        <div className={styles.action}>
          <span>Уже зарегестрированы?</span>
          <BrowserRouter>
            <Link
              to = '/login'
              className={styles.link}
            >
              { ' ' }
              Войти
            </Link>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}
export default Registration