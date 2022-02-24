import {useEffect, useState} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import styles from './App.module.css';
import {BASEURL} from '../../utils/constants';
import {BurgerContext} from '../../utils/context'

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

  return (
    <BurgerContext.Provider value={{data, setData}}>     
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients 
          onClickCard = {(evt) => {
            //  уже есть функция онКликКард - она возвращает айди ингредиента при клике на ингредиент
            //ранее в селектедингридиент находила по этому айди остальные данные ингредиента
            //т.е. айди ингредиента находится при клике, а при передаче ingredient по этому айди находятся данные в дате
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
          //перенесла сюда
          ingredient = {data.find((element) => element._id === ingredient)}
          />
        </Modal>
      )}
    </div>
    </BurgerContext.Provider>
  );
}

export default App;
