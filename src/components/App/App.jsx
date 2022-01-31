import {useEffect, useState} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import styles from './App.module.css';
import {BASEURL} from '../../constants/constants';

function App() {
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
  
  const selectedIngredientCard = data.find((element) => element._id == ingredient);

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients 
          data = {data} 
          onClickCard = {(evt) => setIngredient(evt.currentTarget.id)} 
        />
        <BurgerConstructor data = {data}/>
      </main>
      {ingredient && (
        <Modal 
        title={"Детали ингредиента"} 
        onClose = {() => setIngredient('')}>
          <IngredientDetails 
          ingredient = {selectedIngredientCard}
          />
        </Modal>
      )}

    </div>
  );
}

export default App;
