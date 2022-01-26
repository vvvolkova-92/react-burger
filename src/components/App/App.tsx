import {EffectCallback, useEffect, useState} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
const BASEURL = 'https://norma.nomoreparties.space/api/ingredients';
function App() {
  // 2. Подключитесь к API
  const getData = async (url: string) => {
    const res = await fetch(url);
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status + " - " + res.statusText}`);
  }
  const [data, setData] = useState([]);

  useEffect( () => {
    getData(BASEURL)
      .then(( {data}) => setData(data));
  }, []);


  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data = {data}/>
        <BurgerConstructor data = {data}/>
      </main>

    </div>
  );
}

export default App;
