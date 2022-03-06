import {useEffect, useMemo, useRef} from 'react';
import { useSelector , useDispatch} from "react-redux";
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ButtonGetOrderNumber from '../ButtonGetOrderNumber/ButtonGetOrderNumber';
import {getIngredientsInConstructor} from '../../services/actions/constructorIngredientsAction'
import styles from './BurgerConstructor.module.css';
import {addIngredientCard, moveIngredient, deleteIngredient} from '../../services/actions/constructorIngredientsAction'
import {sumPrice} from '../../services/actions/priceAction';


const Ingredient = ({ index, id, name, price, image_mobile }) => {
    const dispatch = useDispatch();
    const finalCard = useSelector(store => store.ingredients);
    const orderModal = useSelector(store => store.orderReducer.order);
    
    const { bun, main} = useSelector(store => store.constructorIngredients);
    // useEffect(() => {
    //   dispatch(count(main, finalCard, orderModal));
    // }, [main, bun, deleteIngredient, moveIngredient]);
  
    const ref = useRef(null);
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: 'MOVE_CARD',
      collect: monitor => ({
        isOver: !!monitor.isOver(),
    }),
      hover: (item, monitor) => {
        if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredient(dragIndex, hoverIndex, main));
      item.index = hoverIndex;
    },
    }));

    const [{ isDragging }, drag] = useDrag({
      type: 'MOVE_CARD',
      item: () => {
        return { id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drag(drop(ref));
  
    return (
      <li className={styles.item + " mr-2 mt-4 mb-4 " + styles.flex} key={id} ref={ref}>
          <div className=""><DragIcon type="primary" /></div>
          <ConstructorElement
            text={name}
            price={price}
            thumbnail={image_mobile}
            handleClose={() => {
              dispatch(deleteIngredient(main, id, finalCard));
            }}
          />
        </li> 
    );
}

const IngredientsList = () => {
  const main = useSelector(store => store.constructorIngredients.main);
    {return main.map((item, i) => {
    return (
      <Ingredient
        index={i}
        id={item._id}
        name={item.name}
        price={item.price}
        image_mobile={item.image_mobile}
      />
    );
  })}
}

const Buns = () => {
  const dispatch = useDispatch();
  const {bun, main} = useSelector (store => store.constructorIngredients);
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
  return (
    <div className={styles.ingr + " pt-25 mr-4 "}>
      {/* если булка есть, то */}
      {bun !== undefined ? bun.type && (<div className={styles.item+ " mr-4 "}>
    <ConstructorElement
      type="top"
      isLocked={true}
      text={bun.name + ' (верх)'}
      price={bun.price}
      thumbnail={bun.image_mobile}
    />
    </div>) : ''}
  {/* если булки нет, то  */}
    {!bun.type && <p className = {styles.message + " text_type_main-medium text_color_inactive"}>Булка не выбрана, нужно выбрать &#127838;</p>}
        <ul className={styles.list} ref={drop}>
          {/* если основные ингредиенты уже добавлены, то вывести сообщение, иначе вывести список с ингредиентами */}
          {main.length <= 0 
            ? <p className = {styles.message + " text_type_main-medium text_color_inactive"}>Пустую булку есть никому не понравится, добавьте ингрединты! &#127798; &#129363; &#129408;</p>
            : <IngredientsList />
        }
        </ul>
    {bun.type && (<div className={styles.item+ " mr-4 "}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bun.name + ' (верх)'}
        price={bun.price}
        thumbnail={bun.image_mobile}
      />
      </div>)}
  </div>
  )
}

function BurgerConstructor () {
  let toSendOrder = null;
  const {bun, main} = useSelector (store => store.constructorIngredients);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(sumPrice(bun, main))
  }, [bun, main]);
  const total = useSelector(store => store.ingredients.total)
  const totalPrice = useSelector(store => store.price.totalSum);

  //для отправки
  if(bun) bun.type ? toSendOrder = main.map(item => item._id).concat(bun._id, bun._id) : toSendOrder = null
  return ( <>
  {<div className={styles.block}>
    <Buns />
    <IngredientsList />
    <div className={styles.total + " mt-10 mr-4"}>
      <div className="pr-10">
        <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
        <div className={styles.icon}><CurrencyIcon type="primary" /></div>
      </div>
      <ButtonGetOrderNumber bun = {bun} main = {main}/>
    </div>
  </div>
}
</>
)}


export default BurgerConstructor 