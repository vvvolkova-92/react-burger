import { useState, useContext, useRef} from "react";
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCard from '../IngredientsCard/IngredientsCard';
import styles from './BurgerIngredients.module.css';
import {propTypesForIngridients, menuItems} from '../../utils/constants';
import {BurgerContext} from '../../utils/context';
import { useSelector, useDispatch } from "react-redux";
import {getIngredientsInConstructor} from '../../services/actions/constructorIngredientsAction';
import { setCurrentIngredient } from '../../services/actions/currentIngredientAction';

function BurgerIngredients () {

  const [current, setCurrent] = useState('one');

  const data = useSelector (store => store.ingredients.ingredients);
  const dispatch = useDispatch();

  const onClickCard = evt => {
    const currentItem = data.find((element) => element._id === evt.currentTarget.id);
    dispatch(setCurrentIngredient(currentItem));
  }


  const bunRef = useRef(null);
  const souceRef = useRef(null);
  const mainRef = useRef(null);


  const menu = menuItems.map(item => {
    return (<li key={item.id}>
      <Tab value={item.value} active = {current === item.value} onClick={value => {
        setCurrent(value);
        if(bunRef.current.id === value) {
          bunRef.current.scrollIntoView({behavior: "smooth"});
        } 
        if(souceRef.current.id === value) {
          souceRef.current.scrollIntoView({behavior: "smooth"});
        } else if(mainRef.current.id === value) {
          mainRef.current.scrollIntoView({behavior: "smooth"});
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
      return (<li className={"ml-4 mr-6 " + styles.card} id={card._id} key={card._id} onClick={onClickCard}>
        <IngredientsCard 
          imglink = {card.image}
          price = {card.price}
          name = {card.name}
        /> 
    </li>
      )
    }
  }).filter((element) => element !== undefined);

    // соусы
  const sauce = data.map((card) => {
    if (card.type === 'sauce') {
      return ( <li className={"ml-4 mr-6 " + styles.card} id={card._id} key={card._id} onClick={onClickCard}>
        <IngredientsCard 
          imglink = {card.image}
          price = {card.price}
          name = {card.name}
        />
      </li>
      )
    }
  }).filter((element) => element !== undefined);

    //котлетосы
    const main = data.map((card) => {
      if (card.type === 'main') {
        return (<li className={"ml-4 mr-6 " + styles.card} id={card._id} key={card._id} onClick={onClickCard}>
          <IngredientsCard 
            imglink = {card.image}
            price = {card.price}
            name = {card.name}
          />
        </li>
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
      <h2 className="text text_type_main-medium mt-10 mb-6" id="one" ref={bunRef}>Пол булки - плати дважды!</h2>
      <ul className={styles.flex}>
        {bun}
      </ul>
      <h2 className="text text_type_main-medium mt-10 mb-6" id="two" ref={souceRef}>Соусы</h2>
      <ul className={styles.flex}>
        {sauce}
      </ul>
      <h2 className="text text_type_main-medium mt-10 mb-6" id="three" ref={mainRef}>Начинки</h2>
      <ul className={styles.flex}>
        {main}
      </ul>
    </div>
    </div>
    );
  }

export default BurgerIngredients 


  