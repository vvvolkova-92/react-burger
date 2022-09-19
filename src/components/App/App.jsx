import {useCallback, useEffect} from 'react';
import {BrowserRouter, Route, Switch, useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {useDispatch, useSelector} from 'react-redux';
// мои компоненты
import PrivateRouteLoginUser from "../ProtectedRoute/PrivateRouteLoginUser";
import PrivateRouteUnloggedUser from "../ProtectedRoute/PrivateRouteUnloggedUser";
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import {getIngredients } from '../../services/actions/ingredientsAction';
import { setCurrentIngredient } from '../../services/actions/currentIngredientAction';
import {getUserData, refreshToken} from "../../services/actions/authenticationAction";
import {getCookie} from "../../utils/constants";
// страницы
import Login from "../../pages/Login/Login";
import Registration from "../../pages/Registration/Registration";
import Profile from "../../pages/Profile/Profile";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import Feed from '../../pages/Feed/Feed';
import UserOrders from '../UserOrders/UserOrders';
import OrderDetailInFeed from '../OrderDetailInFeed/OrderDetailInFeed';
import { setCurrentOrderDetail } from '../../services/actions/orderAction';
//стили
import styles from './App.module.css';
import UserInfo from '../UserInfo/UserInfo';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const background = location.state && location.state.background;

  const { isFetching } = useSelector(store => store.ingredients);
  const {ingredientCardModal} = useSelector(state => state.modalReducer);
  const currentIngredient= useSelector(store => store.currentIngredient);

  const closeOrderFeedmodal = useCallback (() => {
    dispatch(setCurrentOrderDetail(null));
    history.replace({ pathname: location?.state?.from || '/feed' });
  }, [history]);

  const closeModal = useCallback (() => {
    dispatch(setCurrentIngredient(null));
    history.replace({ pathname: "/" });
  }, [history]);

  const closeOrderOrdermodal = useCallback (() => {
    dispatch(setCurrentOrderDetail(null));
    history.replace({ pathname: location?.state?.from || '/profile/orders'});
  }, [history]);

  useEffect( () => {
    dispatch(getIngredients());
    dispatch(getUserData());
  }, []);
  return (
    <>
      {!isFetching && (
        <div className={styles.App}>
          <AppHeader/>
          <Switch location={background || location}>
            <Route exact path={`/ingredients/:id`} children={<IngredientDetails/>}/>
            <Route path="/" exact={true}>
              <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                  <BurgerIngredients/>
                  <BurgerConstructor/>
                </main>
              </DndProvider>
            </Route>
            <PrivateRouteLoginUser path="/login" exact={true} children={<Login/>}/>
            <PrivateRouteLoginUser path="/register" exact={true} children={<Registration/>}/>
            <PrivateRouteUnloggedUser path="/profile" exact={true} children={<Profile/>}/>
            <PrivateRouteUnloggedUser path="/profile/orders" exact={true} children={<Profile/>}/>
            <PrivateRouteUnloggedUser path="/profile/orders/:id" exact={true} children={<OrderDetailInFeed/>}/>
            <Route path="/reset-password" exact={true} children={<ResetPassword/>}/>
            <PrivateRouteLoginUser path="/forgot-password" exact={true} children={<ForgotPassword/>}/>
            <Route path="/feed" exact={true} children={<Feed/>}/>
            <Route exact path={`/feed/:id`} children={<OrderDetailInFeed/>}/>
            <Route exact={true} children={<PageNotFound/>}/>
          </Switch>
          {background && (
            <Route
              path={`${background.pathname}/:id`}
              children={
                <Modal
                  closeModal={closeOrderFeedmodal}
                  orderModal
                  >
                  <OrderDetailInFeed/>
                </Modal>
              }
            >
            </Route>
          )}
          {background && (
            <Route
              path={`/profile/orders/:id`}
              children={
                <Modal
                  closeModal={closeOrderOrdermodal}
                  orderModal
                  >
                  <OrderDetailInFeed/>
                </Modal>
              }
              exact
            >
            </Route>
          )}
          {background && (
            <Route
              path={`/ingredients/:id`}
              children={
                <Modal
                  title={"Детали ингредиента"}
                  closeModal={closeModal}>
                  <IngredientDetails/>
                </Modal>
              }
            >
            </Route>
          )}
        </div>
      )}
    </>
  );
}

export default App;