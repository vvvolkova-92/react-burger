import PropTypes from 'prop-types';
import styles from './IngredientsCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useState, useCallback, useMemo } from 'react';
import { getIngredientsInConstructor } from '../../services/actions/constructorIngredientsAction';
import { useDispatch, useSelector } from 'react-redux';
import { DROP_INGREDIENT } from '../../services/types'

  function IngredientsCard ({imglink, price, name, item}) {

    const dispatch = useDispatch();
    const { main, bun } = useSelector(store => ({
    bun: store.constructorIngredients.bun,
    main: store.constructorIngredients.main,
  }));


    const count = useMemo(() => {
      return item.type === 'bun' && item._id === bun._id
        ? 2
        : main.filter((ing) => ing._id === item._id).length;
    }, [main, bun, item]);

    const [, drag] = useDrag(() => ({
      type: DROP_INGREDIENT,
      item: item,
    }));

    return (<>
    <img src={imglink} alt={name} className={styles.image + " pl-4"} ref={drag}/>
    <div className={styles.price + " mt-2 mb-2"}>
      <span className="pr-2 text text_type_digits-default">{price}</span>
      <CurrencyIcon type="primary"/>
    </div>
    <p className={styles.title}>{name}</p>
    {count > 0 && <Counter count={count} size="default"/>}
  </>
  )}

  // IngredientsCard.propTypes = {
  //   name: PropTypes.string.isRequired,
  //   imglink: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  // }

export default IngredientsCard; 


  