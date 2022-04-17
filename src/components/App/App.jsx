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
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation, useRouteMatch} from 'react-router-dom'
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setCurrentIngredient } from '../../services/actions/currentIngredientAction';
import PrivateRouteLoginUser from '../ProtectedRoute/PrivateRouteLoginUser';
import PrivateRouteUnloggedUser from '../ProtectedRoute/PrivateRouteUnloggedUser';
import { getCookie, refreshUser } from '../../services/actions/authentication';
const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { ingredients } = useSelector(store => store.ingredients);
  const { path} = useRouteMatch();
  console.log('path');
  console.log(path);
  const closeModal = () => {
    dispatch(setCurrentIngredient(null));
    history.replace({ pathname: "/" });
  }

  useEffect( () => {
    dispatch(getIngredients());
    const refreshToken = getCookie('refreshToken');
    // if (getCookie('accessToken')) dispatch(refreshUser(refreshToken));
  }, []);

  const {ingredientCardModal} = useSelector(state => state.modalReducer);
  const currentIngredient= useSelector(store => store.currentIngredient);

  const background = location.state && location.state.background;
  // {ingredientCardModal && (
  //   <Route path={`/ingredients/:id`}>
  //     <IngredientDetails title = {'Детали ингредиента'}/>
  //   </Route>
  // )}
  console.log(location.state);
  return ( 
          <div className={styles.App}>
            <AppHeader />
            <Switch location={background || location}>
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
              <Route
                  exact
                  path={`/ingredients/:id`}
                  component={IngredientDetails}
                />
                            <Route path="/" >
                <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                  <BurgerIngredients />
                  <BurgerConstructor/>
                </main>
                </DndProvider>
              </Route>
              <Route>
                <Error404 />
              </Route>
            </Switch>
            {background && (
                <Route
                  path={`/ingredients/:id`}
                  children={
                    <Modal
                      header={"Детали ингредиента"}
                      closeModal={closeModal}
                    >
                      <IngredientDetails />
                  </Modal>
                  }
                ></Route>
              )}
        </div>
  );
}

export default App;
