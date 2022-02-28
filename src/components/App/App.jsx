import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import styles from './App.module.css';
import {BASEURL} from '../../utils/constants';
import {BurgerContext} from '../../utils/context'
import {getIngredients} from '../../services/actions/ingredientsAction'

import {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.ingredients)
  // <========= Подключитесь к API
  useEffect( () => {
    dispatch(getIngredients())
  }, []);
  // Подключитесь к API =============>

  // const [data, setData] = useState([]);
  // const [ingredient, setIngredient] = useState('');
  return ( 
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        {/* <BurgerIngredients 
          onClickCard = {(evt) => {
            setIngredient(evt.currentTarget.id);
            }
          }/> */}
          <BurgerConstructor/>
      </main>
      {/* {ingredient && (
        <Modal 
        title={"Детали ингредиента"} 
        onClose = {() => setIngredient('')}>
          <IngredientDetails 
          ingredient = {data.find((element) => element._id === ingredient)}
          />
        </Modal>
      )} */}
    </div>
  );
  // return (
  //   <div className={styles.App}>
  //     <AppHeader />
  //     <main className={styles.main}>
  //       {console.log(ingredients)}
  //       {/* <BurgerIngredients /> */}
  //         {/* <BurgerConstructor/> */}
  //     </main>
  //         {/* <IngredientDetails /> */}
  //   </div>
  // );

}


export default App;
