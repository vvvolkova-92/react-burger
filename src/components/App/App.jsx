import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import SignIn from '../../pages/signIn/signIn';
import Registration from '../../pages/registration/Registration';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Error404 from '../../pages/404/404';
import Profile from '../../pages/Profile/Profile';
import Modal from '../Modal/Modal';
import styles from './App.module.css';
import { getIngredients } from '../../services/actions/ingredientsAction';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setCurrentIngredient } from '../../services/actions/currentIngredientAction';
import PrivateRouteLoginUser from '../ProtectedRoute/PrivateRouteLoginUser';
import PrivateRouteUnloggedUser from '../ProtectedRoute/PrivateRouteUnloggedUser';
const App = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setCurrentIngredient(null));
  }

  useEffect( () => {
    dispatch(getIngredients())
  }, []);


  const {ingredientCardModal} = useSelector(state => state.modalReducer);
  const currentIngredient= useSelector(store => store.currentIngredient);

  return ( 
    <div className={styles.App}>
      <Router>
        <AppHeader />
        <Switch>
          <PrivateRouteLoginUser path="/login" exact={true}>
            <SignIn />
          </PrivateRouteLoginUser>
          <PrivateRouteLoginUser path="/register" exact={true}>
            <Registration />
          </PrivateRouteLoginUser>
          <PrivateRouteLoginUser path="/forgot-password" exact={true}>
            <ForgotPassword />
          </PrivateRouteLoginUser>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <PrivateRouteUnloggedUser path="/profile" exact={true}>
            <Profile />
          </PrivateRouteUnloggedUser>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients />
              <BurgerConstructor/>
            </main>
            {ingredientCardModal && (
              <Modal 
              title={"Детали ингредиента"}
              closeModal={closeModal}>
                <IngredientDetails 
                ingredient = {currentIngredient}/>
              </Modal>
            )}
            </DndProvider>
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
