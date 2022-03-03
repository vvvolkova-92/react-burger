import {useEffect, useMemo} from 'react';
import { useSelector , useDispatch} from "react-redux";
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import ButtonGetOrderNumber from '../ButtonGetOrderNumber/ButtonGetOrderNumber';
import {getIngredientsInConstructor} from '../../services/actions/constructorIngredientsAction'
import styles from './BurgerConstructor.module.css';


function BurgerConstructor () {
  const {main2, bun2 } = useSelector (store => store.constructorIngredients);

  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'INGREDIENT_CARD',
    //написать экшен addIngredientCard!!!
    drop: (item) => {dispatch(addIngredientCard(item, main2, bun2)) },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
  }),
  }));
  const isActive = canDrop && isOver;


  const data = useSelector (store => store.ingredients.ingredients);

  const someIngredients = useMemo( () => data.slice(0,6), [data]);
 
  let bunPrice = 0, mainPrice = 0;

  //выбранная булка
  const bun = useMemo( () => {
    return someIngredients.map(item => {
      let activeBun;
      if (item.type === 'bun') {
        activeBun = {...item};
        bunPrice = item.price * 2;
      }
      return activeBun;
    }).filter((element) => element !== undefined)[0]
  }, [someIngredients]);

  //булка верх для вставки

  const bunTop = bun !== undefined ? (
    <div className={styles.item+ " mr-4 "}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={bun.name + ' (верх)'}
        price={bun.price}
        thumbnail={bun.image_mobile}
      />
    </div> 
    ) : '';

  //булка низ для вставки
  const bunBottom = bun !== undefined ? (
    <div className={styles.item +" mr-4 "}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bun.name + ' (низ)'}
        price={bun.price}
        thumbnail={bun.image_mobile}
      />
    </div> 
    ) : '';

  //остальные ингредиенты для вставки

  const mainIngredients = useMemo( () => {
    return someIngredients.map(item => {
      let main;
      if (item.type !== 'bun') {
        main = item;
        mainPrice += item.price;
      }
      if (main !== undefined) return (
        <li className={styles.item + " mr-2 mt-4 mb-4 " + styles.flex} key={item._id}>
          <div className=""><DragIcon type="primary" /></div>
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image_mobile}
          />
        </li> 
      )
    }).filter((element) => element !== undefined)
  }, [someIngredients])

  // const totalPrice = mainPrice + bunPrice;

  return ( <>
  {someIngredients && <div className={styles.block}ref={drop} role={'Card'} >
    <div className={styles.ingr + " pt-25 mr-4 "}>
      {bunTop}
      <ul className={styles.list}>
        {mainIngredients}
      </ul>
      {bunTop && bunBottom} 
      <div className={styles.total + " mt-10 mr-4"}>
        <div className="pr-10">
          <span className="text text_type_digits-medium pr-2">{mainPrice + bunPrice}</span>
          <div className={styles.icon}><CurrencyIcon type="primary" /></div>
          </div>
          <ButtonGetOrderNumber ingredients = {someIngredients} />
      </div>
  </div>
</div>
}

</>
)}

export default BurgerConstructor 