import {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

import styles from './BurgerConstructor.module.css';
import {ORDER_NUMBER, propTypesForIngridients}  from '../../utils/constants';
import {IngredientsContext} from '../../utils/context';

function BurgerConstructor () {

  const [order, setOrder] = useState(false);
  const {data, setData} = useContext(IngredientsContext);

  function showOrderDetails () {
    return order && (
      <Modal onClose = {() => setOrder(false)}>
        <OrderDetails orderNumber={ORDER_NUMBER}/>
      </Modal>
    )}

  let bunPrice = 0;
  let mainPrice = 0;
  let totalPrice = 0;
  //рандомные ингредиенты
  const someIngredients = data.slice(1,10);

  //булки
  let bunArray = someIngredients.map(item => {
    let activeBun;
    if (item.type === 'bun') {
      activeBun = {...item};
      bunPrice = item.price * 2;
    }
    return activeBun;
  }).filter((element) => element !== undefined);

  //выбранная булка

  const bun = bunArray[0];

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

  let mainIngredients = someIngredients.map(item => {
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
  }).filter((element) => element !== undefined);

  console.dir(mainIngredients);

  totalPrice = mainPrice + bunPrice;

  return ( <>
  <div className={styles.block}>
    <div className={styles.ingr + " pt-25 mr-4 "}>
      {bunTop}
      <ul className={styles.list}>
        {mainIngredients}
      </ul>
      {bunTop && bunBottom} 

      <div className={styles.total + " mt-10 mr-4"}>
        <div className="pr-10">
          <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
          <div className={styles.icon}><CurrencyIcon type="primary" /></div>
        </div>
        <Button type="primary" size="large" onClick={() => {
          setOrder(true);
        }}>
        Оформить заказ
        </Button>
        {showOrderDetails()}
      </div>
  </div>
</div>
</>
)}

  BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(propTypesForIngridients)
  };

export default BurgerConstructor 