import {useEffect, useMemo} from 'react';
import { useSelector , useDispatch} from "react-redux";
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import ButtonGetOrderNumber from '../ButtonGetOrderNumber/ButtonGetOrderNumber';
import {getIngredientsInConstructor} from '../../services/actions/constructorIngredientsAction'
import styles from './BurgerConstructor.module.css';
import {addIngredientCard} from '../../services/actions/constructorIngredientsAction'

function BurgerConstructor () {
  const {bun, main} = useSelector (store => store.constructorIngredients);
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'INGREDIENT_CARD',
    //написать экшен addIngredientCard!!!
    drop: (item) => {dispatch(addIngredientCard(item, bun, main)) },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
  }),
  }));
  const isActive = canDrop && isOver;
  // const someIngredients = useMemo( () => data.slice(0,6), [data]);
 
  let bunPrice = 0, mainPrice = 0;
let bunBottom = '';
let bunTop = ''; 

  bunTop = bun.type !== undefined ? (<div className={styles.item+ " mr-4 "}>
  <ConstructorElement
    type="top"
    isLocked={true}
    text={bun.name + ' (верх)'}
    price={bun.price}
    thumbnail={bun.image_mobile}
  />
</div>) : '';

  bunBottom = bun.type !== undefined ? (<div className={styles.item+ " mr-4 "}>
  <ConstructorElement
    type="bottom"
    isLocked={true}
    text={bun.name + ' (верх)'}
    price={bun.price}
    thumbnail={bun.image_mobile}
  />
</div>) : '';

  // остальные ингредиенты для вставки
  const mainIngredients = main.map(item => {
      return (
        <li className={styles.item + " mr-2 mt-4 mb-4 " + styles.flex} key={item._id}>
          <div className=""><DragIcon type="primary" /></div>
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image_mobile}
          />
        </li> 
      )
    }).filter((element) => element !== undefined);

  // const totalPrice = mainPrice + bunPrice;

  return ( <>
  {<div className={styles.block}ref={drop} role={'Card'} >
    <div className={styles.ingr + " pt-25 mr-4 "}>
      {bunTop 
      ? (<div className={styles.item+ " mr-4 "}>
    <ConstructorElement
      type="top"
      isLocked={true}
      text={bun.name + ' (верх)'}
      price={bun.price}
      thumbnail={bun.image_mobile}
    />
  </div>)
      : ''}
      <ul className={styles.list}>
        {mainIngredients}
      </ul>
      {bunTop && bunBottom} 
      <div className={styles.total + " mt-10 mr-4"}>
        <div className="pr-10">
          <span className="text text_type_digits-medium pr-2">{}</span>
          <div className={styles.icon}><CurrencyIcon type="primary" /></div>
          </div>
          <ButtonGetOrderNumber ingredients = {bun, main} />
      </div>
  </div>
</div>
}

</>
)}

export default BurgerConstructor 