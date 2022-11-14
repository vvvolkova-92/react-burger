import styles from './IngredientsCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { FC, useMemo } from 'react';
import { useSelector } from '../../services/types/hooks';
import { DROP_INGREDIENT } from '../../services/types';
import { TIngredientsCard } from '../../services/types/interfaces';

const IngredientsCard: FC<TIngredientsCard> = ({imglink, price, name, item}) => {
  const { main, bun } = useSelector(store => ({
    bun: store.constructorIngredients.bun,
    main: store.constructorIngredients.main,
  }));

  const count = useMemo(() => {
    if( bun!== null) {
      if (item.type === 'bun' && item._id === bun._id) return 2
      else {
        let countIng = 0;
        main.map(ing => {
          if(ing._id === item._id) countIng +=1
        });
        return countIng;
      }
    }
  }, [main, bun, item]);

  const [, drag] = useDrag(() => ({
    type: DROP_INGREDIENT,
    item: item,
  }));

  return (
    <>
      <img src={imglink} alt={name} className={styles.image + " pl-4"} ref={drag}/>
      <div className={styles.price + " mt-2 mb-2"}>
        <span className="pr-2 text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={styles.title}>{name}</p>
      {(count!== undefined && count > 0) && <Counter count={count} size="default"/>}
</>
  )}

export default IngredientsCard;