import { FC} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../services/types/hooks";
import { Link, useHistory, Redirect } from 'react-router-dom';
// сторонние компоненты
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
//мои компоненты
import InputPassword from "../../components/Inputs/InputPassword";
// вспомогательные функции
import {changePassword, verifity} from "../../services/actions/authenticationAction";
// стили
import styles from './ResetPassword.module.css';
import {getMessage} from "../../utils/constants";


const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { hasError, error, result } = useSelector((state) => state.ForgotPasswordReducer);
  const { userPassword, verificationCode } = useSelector((state) => state.inputReducer);
  const errorText = getMessage(error!);
  const successText = getMessage(result!.message!);

  const onChangeCodeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(verifity(evt));
  };

  const onSubmitHandler = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(changePassword(userPassword, verificationCode, history));
  };

  if (history.action === "POP") return <Redirect to={{ pathname: "/" }} />;

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title + " text text_type_main-medium mb-6"}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <InputPassword />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChangeCodeHandler}
            value={verificationCode}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button type="primary" size="medium">Изменить</Button>
        </form>
        {hasError && <span className={styles.error}>{errorText}</span>}
        {result && <span className={styles.error}>{successText}</span>}
      </div>
      <div className={styles.actions + ' text text_type_main-default text_color_inactive mt-20'}>
        <div className={styles.action}>
          <span>Уже зарегестрированы?</span>
          <Link
            to = '/login'
            className={styles.link}
          >
            { ' ' }
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
};

export default ResetPassword;