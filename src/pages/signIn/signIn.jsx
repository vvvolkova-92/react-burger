import { useSelector, useDispatch } from "react-redux";
import styles from './signIn.module.css';
import { Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import InputEmail from '../../components/Inputs/InputEmail';
import InputPassword from '../../components/Inputs/InputPassword';
import { userLogin } from '../../services/actions/authentication';
import { getErrorMessage } from '../../utils/constants';

const SignIn = () => {
  const dispatch = useDispatch();
  const { error, hasError } = useSelector(state => state.userData);
  const inputData = useSelector(state => state.inputData);
  const history = useHistory();
  const errorText = getErrorMessage(error);
  const onIconClick = () => {
    alert('Временно')
  }
  //TODO : сделать обработку ошибок и их вывод! 
  const onClickButtonHandler = () => {
    dispatch(userLogin(inputData, history));
  }
  
  return ( 
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Вход</h1>
        <form className={styles.form}>
          <InputEmail placeholder = { 'Email' }/>
          <InputPassword />
        </form>
        <Button type="primary" size="medium" onClick ={onClickButtonHandler}>Войти</Button>
        {hasError && <span className={styles.error}>{errorText}</span>}
      </div>
      <div className={styles.actions + ' text text_type_main-default text_color_inactive mt-20'}>
        <div className={styles.action}>
          <span>Вы новый пользователь?</span>
          <Link
          to = '/register'
          className={styles.link}
          > 
          { ' ' }
          Зарегистрироваться
          </Link>
        </div>
        <div className={styles.action}>
          <span>Забыли пароль?</span>
          <Link
          to = '/forgot-password'
          className={styles.link}
          > 
          { ' ' }
          Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
