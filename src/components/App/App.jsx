import {useEffect} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {useDispatch, useSelector} from 'react-redux';
// мои компоненты
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import {getIngredients } from '../../services/actions/ingredientsAction';
import { setCurrentIngredient } from '../../services/actions/currentIngredientAction';
import {getUserData} from "../../services/actions/authenticationAction";
import {getCookie} from "../../utils/constants";
// страницы
import Login from "../../pages/Login/Login";
import Registration from "../../pages/Registration/Registration";
import Profile from "../../pages/Profile/Profile";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
//стили
import styles from './App.module.css';


const App = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setCurrentIngredient(null));
  }

  useEffect( () => {
    dispatch(getIngredients());
    if (getCookie('accessToken')) dispatch(getUserData());
  }, []);


  const {ingredientCardModal} = useSelector(state => state.modalReducer);
  const currentIngredient= useSelector(store => store.currentIngredient);

  return (
    <div className={styles.App}>

      <BrowserRouter>
        <AppHeader/>
        <Switch>
          <Route path="/login" exact={true}>
            <Login/>
          </Route>
          <Route path="/register" exact={true}>
            <Registration/>
          </Route>
          <Route path="/profile" exact={true}>
            <Profile/>
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword/>
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword/>
          </Route>
          <Route path="/profile" exact={true}>
            <PageNotFound/>
          </Route>
          <Route path="/">
            <DndProvider backend={HTML5Backend}>
              <main className={styles.main}>
                <BurgerIngredients/>
                <BurgerConstructor/>
              </main>
              {ingredientCardModal && (
                <Modal
                  title={"Детали ингредиента"}
                  closeModal={closeModal}>
                  <IngredientDetails
                    ingredient={currentIngredient}/>
                </Modal>
              )}
            </DndProvider>
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
