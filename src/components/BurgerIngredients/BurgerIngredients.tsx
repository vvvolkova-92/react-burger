import { useState } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCard from '../IngredientsCard/IngredientsCard';
import styles from './BurgerIngredients.module.css';

function BurgerIngredients ({data, onClickCard} : any) {

  const [current, setCurrent] = useState('one');
  const menuItems = [
    {id: nanoid(10), name: 'Булки', value: 'one'},
    {id: nanoid(10), name: 'Соусы', value: 'two'},
    {id: nanoid(10), name: 'Начинки', value: 'three'},
  ]
  const menu = menuItems.map(item => {
    return (<li key={item.id}>
      <Tab value={item.value} active={current === item.value} onClick={setCurrent}>
      {item.name}
      </Tab>
    </li>
    )
  })

  //ингредиенты
    //булки
  const bun = data.map((card : any) => {
    if (card.type === 'bun') {
      return (<li className={"ml-4 mr-6 " + styles.card} key={card._id} onClick={onClickCard}>
        <IngredientsCard 
          imglink = {card.image}
          price = {card.price}
          name = {card.name}
        /> 
    </li>
      )
    }
  }).filter((element:any) => element !== undefined);

    // соусы
  const sauce = data.map((card : any) => {
    if (card.type === 'sauce') {
      return ( <li className={"ml-4 mr-6 " + styles.card} key={card._id} onClick={onClickCard}>
        <IngredientsCard 
          imglink = {card.image}
          price = {card.price}
          name = {card.name}
        />
      </li>
      )
    }
  }).filter((element:any) => element !== undefined);

    //котлетосы
    const main = data.map((card : any) => {
      if (card.type === 'main') {
        return (<li className={"ml-4 mr-6 " + styles.card} key={card._id} onClick={onClickCard}>
          <IngredientsCard 
            imglink = {card.image}
            price = {card.price}
            name = {card.name}
          />
        </li>
        )
      }
    }).filter((element:any) => element !== undefined);

    return ( 
    <div className={styles.block + " ml-5"}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <ul className={styles.menu + ' ' + styles.list}>
        {menu}
    </ul>
    <div className={styles.ingr}>
      <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
      <ul className={styles.flex}>
        {bun}
      </ul>
      <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
      <ul className={styles.flex}>
        {sauce}
      </ul>
      <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
      <ul className={styles.flex}>
        {main}
      </ul>
    </div>
    </div>
    
    );
  }

  BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    onClickCard : PropTypes.func,
  };
  
export default BurgerIngredients 


  