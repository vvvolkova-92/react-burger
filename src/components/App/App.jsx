import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import styles from './App.module.css';
import {BASEURL} from '../../utils/constants';
import {BurgerContext} from '../../utils/context';
import {getIngredients} from '../../services/actions/ingredientsAction';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';

const App = () => {

  useEffect( () => {
    dispatch(getIngredients())
  }, []);
  const dispatch = useDispatch();
  const {ingredients} = useSelector(store => store.ingredients);
  const {ingredientCardModal} = useSelector(state => state.modalReducer);
  const currentIngredient= useSelector(store => store.currentIngredient);
  // <========= Подключитесь к API

  // Подключитесь к API =============>

  // const [data, setData] = useState([]);
  // const [ingredient, setIngredient] = useState('');
  return ( 
    <DndProvider backend={HTML5Backend}>
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor/>
      </main>
      {ingredientCardModal && (
        <Modal 
        title={"Детали ингредиента"}>
          <IngredientDetails 
          ingredient = {currentIngredient}/>
        </Modal>
      )}
    </div>
    </DndProvider>
  );

}


export default App;
