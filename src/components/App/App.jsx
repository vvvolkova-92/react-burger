import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import styles from './App.module.css';
import {BASEURL} from '../../utils/constants';
import {BurgerContext} from '../../utils/context'

import {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';

const App = () => {
  // <========= Подключитесь к API
  const getData = async (url) => {
    const res = await fetch(`${url}/ingredients`);
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status + " - " + res.statusText}`);
  }

  useEffect( () => {
    getData(BASEURL)
      .then(( {data}) => setData(data))
      .catch((err) => console.log(err))
  }, []);
  // Подключитесь к API =============>

  const [data, setData] = useState([]);
  const [ingredient, setIngredient] = useState('');

const dispatch = useDispatch()

  return (
    <BurgerContext.Provider value={{data, setData}}>     
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients 
          onClickCard = {(evt) => {
            setIngredient(evt.currentTarget.id);
            }
          }/>
          <BurgerConstructor/>
      </main>
      {ingredient && (
        <Modal 
        title={"Детали ингредиента"} 
        onClose = {() => setIngredient('')}>
          <IngredientDetails 
          ingredient = {data.find((element) => element._id === ingredient)}
          />
        </Modal>
      )}
    </div>
    </BurgerContext.Provider>
  );
}


export default App
