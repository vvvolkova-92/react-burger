import { FC, useEffect} from "react";
import { useSelector, useAppDispatch } from "../../services/types/hooks";
//сторонние компоненты
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
//мои компоненты
import InputName from "../Inputs/InputName";
import InputEmail from "../Inputs/InputEmail";
import InputPassword from "../Inputs/InputPassword";
//вспомогательные функции
import {dontEditProfile, editProfile, getUserData} from "../../services/actions/authenticationAction";

//стили
import styles from './UserInfo.module.css';

const UserInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { userData, isLogin } = useSelector((state) => state.userReducer);
  const { userName, userEmail, userPassword } = useSelector((state) => state.inputReducer);

  useEffect( () => {
    dispatch(getUserData());
  }, [dispatch]);

  const onClickCancel = () => {
    if (userData) dispatch(dontEditProfile(userData));
  };

  const onSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(editProfile(userName, userEmail, userPassword));
  };

  return (
    <div className={"mt-30"}>
      {isLogin && (<>
        <form className={styles.form} onSubmit={onSubmit} id='profile'>
          <InputName icon={'EditIcon'} type={'profile'} />
          <InputEmail placeholder={'Логин/Почта'} icon={'EditIcon'} type={'profile'}/>
          <InputPassword type={'profile'}/>
          <div className={styles.buttons}>
            {/* <Button type="primary" size="medium" form='profile'>Сохранить</Button> */}
            <Button type="primary" size="medium"  htmlType={'submit'}>Сохранить</Button>
            {(userData!.user.email !== userEmail) || (userData!.user.name !== userName) &&  (
              <Button type="primary" size="medium" onClick={onClickCancel} htmlType={'button'}>Отмена</Button>
            )}
          </div>
        </form>
        </>
        )
      }
    </div>
  )
}

export default UserInfo