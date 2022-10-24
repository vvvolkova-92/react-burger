import { useState, useRef, useEffect, useCallback, FC} from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCard from '../IngredientsCard/IngredientsCard';
import styles from './BurgerIngredients.module.css';
import {menuItems} from '../../utils/constants';
import { useDispatch } from "react-redux";
import { useSelector } from '../../services/types/hooks';
import { setCurrentIngredient } from '../../services/actions/currentIngredientAction';
import { Link, useLocation, useHistory } from "react-router-dom";
import { useInView } from 'react-intersection-observer';

const BurgerIngredients: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [current, setCurrent] = useState('one');

  const { ref: mainR, inView: mainInView } = useInView();
  const { ref: bunR, inView: bunInView } = useInView();
  const { ref: souceR, inView: souceInView } = useInView();
  const refMain = useRef<any>(null);
  const refBun = useRef<any>(null);
  const refSouce = useRef<any>(null);

  type TCallback = (node: any) => void;

  const setMainRefs = useCallback<TCallback>(
    (node) => {
      refMain.current = node;
      mainR(node);
    },
    [mainR],
  );
  const setBunRefs = useCallback<TCallback>(
    (node) => {
      refBun.current = node;
      bunR(node);
    },
    [bunR],
  );

  const setSouceRefs = useCallback<TCallback>(
    (node) => {
      refSouce.current = node;
      souceR(node);
    },
    [souceR],
  );

  useEffect(() => {
    souceInView && setCurrent('two');
    bunInView && setCurrent('one');
    mainInView && setCurrent('three');
  },[mainInView, bunInView, souceInView]);

  const data = useSelector (store => store.ingredients.ingredients);
  const dispatch = useDispatch();

  const onClickCard = (evt: React.MouseEvent<HTMLElement> ) => {
    const currentItem = data.find((element) => element._id === evt.currentTarget.id);
    if(currentItem !== undefined) {
      dispatch(setCurrentIngredient(currentItem));
      history.push(`/ingredients/${currentItem._id}`);
    }

  };

  const menu = menuItems.map(item => {
    return (<li key={item.id}>
        <Tab value={item.value} active = {current === item.value} onClick={value => {
          setCurrent(value);
          if (refBun.current !== null) {
            if(refBun.current.id === value) {
              refBun.current.scrollIntoView({behavior: "smooth"});
            }
          }

          if(refSouce.current.id === value) {
            refSouce.current.scrollIntoView({behavior: "smooth"});
          } else if(refMain.current.id === value) {
            refMain.current.scrollIntoView({behavior: "smooth"});
          }          
        }}>
          {item.name}
        </Tab>
      </li>
    )
  })

  //ингредиенты
  //булки
  const bun = data.map((card) => {
    if (card.type === 'bun') {
      return (
        <Link
          to={{
            pathname: `/ingredients/${card._id}`,
            state: { background: location },
          }}
          key={card._id}
          className={styles.link}
        >
          <li className={"ml-4 mr-6 " + styles.card} id={card._id} key={card._id} onClick={onClickCard}>
            <IngredientsCard
              imglink = {card.image}
              price = {card.price}
              name = {card.name}
              item = {card}
            />
          </li>
        </Link>
      )
    }
  }).filter((element) => element !== undefined);

  // соусы
  const sauce = data.map((card) => {
    if (card.type === 'sauce') {
      return (
        <Link
          to={{
            pathname: `/ingredients/${card._id}`,
            state: { background: location },
          }}
          key={card._id}
          className={styles.link}
        >
          <li className={"ml-4 mr-6 " + styles.card} id={card._id} key={card._id} onClick={onClickCard}>
            <IngredientsCard
              imglink = {card.image}
              price = {card.price}
              name = {card.name}
              item = {card}
            />
          </li>
        </Link>
      )
    }
  }).filter((element) => element !== undefined);

  //котлетосы
  const main = data.map((card) => {
    if (card.type === 'main') {
      return (
        <Link
          to={{
            pathname: `/ingredients/${card._id}`,
            state: { background: location },
          }}
          key={card._id}
          className={styles.link}
        >
          <li className={"ml-4 mr-6 " + styles.card} id={card._id} key={card._id} onClick={onClickCard}>
            <IngredientsCard
              imglink = {card.image}
              price = {card.price}
              name = {card.name}
              item = {card}
            />
          </li>
        </Link>
      )
    }
  }).filter((element) => element !== undefined);
  return (
    <div className={styles.block + " ml-5"}>
      <h1 className="mt-10 mb-5 text text_type_main-large" >Соберите бургер</h1>
      <ul className={styles.menu + ' ' + styles.list}>
        {menu}
      </ul>
      <div className={styles.ingr}>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="one" ref={setBunRefs}>Булки (цена за половинку)</h2>
        <ul className={styles.flex}>
          {bun}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="two" ref={setSouceRefs}>Соусы</h2>
        <ul className={styles.flex}>
          {sauce}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="three" ref={setMainRefs}>Начинки</h2>
        <ul className={styles.flex}>
          {main}
        </ul>
      </div>
    </div>
  );
}

export default BurgerIngredients