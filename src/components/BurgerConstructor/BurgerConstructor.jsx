import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop} from 'react-dnd';
//сторонние компоненты
import { ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//стили
import styles from './BurgerConstructor.module.css';
//мои компоненты
import ButtonGetOrderNumber from '../ButtonGetOrderNumber/ButtonGetOrderNumber';
// функции
import { addIngredientCard, moveCard } from '../../services/actions/constructorIngredientsAction';
import { IngredientInConstructor } from '../IngredientInConstructor/IngredientInConstructor.jsx';
import { DROP_INGREDIENT, DROP_CARD } from '../../services/types';

function BurgerConstructor () {
  const {bun, main} = useSelector (store => store.constructorIngredients);
  const dispatch = useDispatch();

  const [, dropIngredient] = useDrop(
    () => ({
      accept: DROP_INGREDIENT,
      drop(item) {
        dispatch(addIngredientCard(item, main));
      },
    }),
    [main]
  );
  
  const findIngredient = (id) => {
      const ingredient = main.filter(item => item.id === id)[0];
      return {
        ingredient,
        index: main.indexOf(ingredient),
      };
    };

  const moveIngredient = (id, overIndex) => {
      const { ingredient, index } = findIngredient(id);
      dispatch(moveCard(ingredient, index, overIndex, main));
    };

  const [, dropCard] = useDrop(() => ({ accept: DROP_CARD }));

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
  : <p className = {"text_type_main-medium text_color_inactive " + styles.message}>Булка не выбрана, нужно выбрать &#127838;</p>;

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
  { <div className={styles.block} ref={dropIngredient}>
    <div className={styles.ingr + " pt-25 mr-4 "}>
      {bunTop}
    <ul className={styles.list} ref={dropCard} >
      { main.length > 0
      ? main.map((item) => {
        return (
        <IngredientInConstructor 
          key= {item.id}
          name = {item.name}
          id = {item.id}
          image={item.image}
          price={item.price}
          moveIngredient = {moveIngredient}
          findIngredient = {findIngredient}
        />
        )
      }).filter((element) => element !== undefined)
      : (<p className = {"text_type_main-medium text_color_inactive " + styles.message}>Как на счёт &#127798; &#129363; &#129408;? Добавьте ингредиенты</p>)
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