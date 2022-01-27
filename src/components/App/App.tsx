import {EffectCallback, useEffect, useState} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import Modal from '../Modal/Modal';
import styles from './App.module.css';
const BASEURL = 'https://norma.nomoreparties.space/api/ingredients';
function App() {
  // Подключитесь к API
  const getData = async (url: string) => {
    const res = await fetch(url);
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status + " - " + res.statusText}`);
  }

  useEffect( () => {
    getData(BASEURL)
      .then(( {data}) => setData(data));
  }, []);


  const [data, setData] = useState([]);
  // const [order, setOrder] = useState(false);
  const [ingredient, setIngredient] = useState('');

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients 
          data = {data} 
          onClickCard = {(evt) => setIngredient(evt.currentTarget)} 
        />
        <BurgerConstructor data = {data}/>
      </main>
      {ingredient && (
        <Modal 
        title={"Детали ингредиента"} 
        closeBtn = {() => setIngredient('')}>
          тестовый текст в окне
        </Modal>
      )}

    </div>
  );
}

export default App;
