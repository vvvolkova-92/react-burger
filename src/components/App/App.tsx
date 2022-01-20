import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
import data from '../../utils/data';
function App() {
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