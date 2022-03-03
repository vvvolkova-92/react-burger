import PropTypes from 'prop-types';
import styles from './IngredientsCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useState, useCallback } from 'react';
import { getIngredientsInConstructor } from '../../services/actions/constructorIngredientsAction';
import { useDispatch } from 'react-redux';

  function IngredientsCard ({imglink, price, name, item}) {
    const dispatch = useDispatch();
    const [{ isDragging }, drag] = useDrag( () => ({
      type: 'INGREDIENT_CARD',
      item: {item},
      end: (item, monitor) => {
        const dropRes = monitor.getDropResult();
        if (item && dropRes) {dispatch(getIngredientsInConstructor(item.item))}
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      })
    }));
    const opacity = isDragging ? 0.4 : 1;
    return (<>
    <img src={imglink} alt={name} className={styles.image + " pl-4"} ref = {drag} role = "Card"/>
    <div className={styles.price + " mt-2 mb-2"}>
      <span className="pr-2 text text_type_digits-default">{price}</span>
      <CurrencyIcon type="primary"/>
    </div>
    <p className={styles.title}>{name}</p>
    <Counter count={0} size="default"/>
  </>
  )}

  IngredientsCard.propTypes = {
    name: PropTypes.string.isRequired,
    imglink: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }

export default IngredientsCard; 


  