import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { useDrop} from 'react-dnd';
import { ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ButtonGetOrderNumber from '../ButtonGetOrderNumber/ButtonGetOrderNumber';
import styles from './BurgerConstructor.module.css';
import { addIngredientCard } from '../../services/actions/constructorIngredientsAction'
import { IngredientInConstructor } from '../IngredientInConstructor/IngredientInConstructor.jsx'
import { DROP_INGREDIENT, DROP_CARD } from '../../services/types'

function BurgerConstructor () {

  const {bun, main} = useSelector (store => store.constructorIngredients);
  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop( 
    () => ({
    accept: DROP_INGREDIENT,
    drop: (item) => {dispatch(addIngredientCard(item, main)) },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
  }),
  }), [main, dispatch]);

  const [, dropCard] = useDrop(() => ( {accept: DROP_CARD}), [main, dispatch]);

  const totalPrice = useMemo(() => {
    let total = 0;
    let totalBun;
    if (bun) totalBun = bun.price * 2
    else totalBun = 0;
    main.map(item => total += item.price);
    return totalBun + total;
  }, [main, bun]);

  const bunTop = bun 
  ? (<div className={styles.item+ " mr-4 "}>
  <ConstructorElement
    type="top"
    isLocked={true}
    text={bun.name + ' (верх)'}
    price={bun.price}
    thumbnail={bun.image_mobile}
  />
  </div>) 
  : <p className = {styles.message + " text_type_main-medium text_color_inactive"}>Булка не выбрана, нужно выбрать &#127838;</p>;

  const bunBottom = bun 
  ? (<div className={styles.item+ " mr-4 "}>
  <ConstructorElement
    type="bottom"
    isLocked={true}
    text={bun.name + ' (верх)'}
    price={bun.price}
    thumbnail={bun.image_mobile}
  />
  </div>) 
  : '';

  return ( <>
  { <div className={styles.block} ref={drop}>
    <div className={styles.ingr + " pt-25 mr-4 "}>
      {bunTop}
    <ul className={styles.list} ref={dropCard} >
      { main.length > 0
      ? main.map((item, index) => {
        return (
        <IngredientInConstructor 
          key= {item.id}
          item = {item}
          index = {index}
          id = {item.id}
        />
        )
      }).filter((element) => element !== undefined)
      : (<p className = {styles.message + " text_type_main-medium text_color_inactive"}>Пустую булку есть никому не понравится, добавьте ингрединты! &#127798; &#129363; &#129408;</p>)
      }
    </ul>
      {bunTop && bunBottom} 
      <div className={styles.total + " mt-10 mr-4"}>
        <div className="pr-10">
          <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
          <div className={styles.icon}><CurrencyIcon type="primary" /></div>
          </div>
          <ButtonGetOrderNumber/>
      </div>
  </div>
</div>
}

</>
)}

export default BurgerConstructor 