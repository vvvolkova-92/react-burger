import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import styles from './App.module.css';
import {getIngredients } from '../../services/actions/ingredientsAction';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const App = () => {

  useEffect( () => {
    dispatch(getIngredients())
  }, []);

  const dispatch = useDispatch();
  const {ingredientCardModal} = useSelector(state => state.modalReducer);
  const currentIngredient= useSelector(store => store.currentIngredient);

  return ( 
    <div className={styles.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </div>
  );
}

export default App;
