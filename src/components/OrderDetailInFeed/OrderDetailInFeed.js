import { useMemo, useEffect } from 'react';
import { useLocation, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//сторонние компоненты 
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//стили
import style from './OrderDetailInFeed.module.css';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/types';

 const Ingredient = ({image, name, price, count}) => {
  return (
    <li className={style.listItem} key={name}>
      <img src={image} alt={name} className={style.ingredientImage} />
      <p className={`${style.ingredientName} text text_type_main-default`}>{name}</p>
      <div className={style.ingredientPriceContainer}>
        <span className={`${style.ingredientPrice} text text_type_digits-default`}>{count} &times; {price}</span>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
 };

function OrderDetailInFeed() {
  const { messages, getMessage } = useSelector((state) => state.socketReducer);
  const orders  = messages?.orders; 

  const { id } = useParams();
  const location = useLocation();
  const order = useMemo(() => {
    return orders?.find(order => order._id === id);
  }, [orders, id]);
  console.log('id >'+ id);
  console.log('orders >');
  console.log(orders);
  // const {name, number, status, ingredients, createdAt } = order;
  const orderDate = new Date(order?.createdAt).toLocaleString();

  const allIngr = useSelector (store => store.ingredients.ingredients);
  //считаем дубли и получаем данные по айди ингредиенты
  const sortIngredients = order?.ingredients.sort(); //сортировка массива
  const duplicates = [];
  sortIngredients?.forEach(element => { 
    duplicates[element] = duplicates[element] + 1 || 1; //получаем пару ключ - значение на дубли
  });
  let ingredientsInOrderData = []; // на выходе будет массив ингредиентов (картинки и т.д.) с количеством без дублей
  for(let key in duplicates){
    let obj = allIngr?.find((element) => element._id === key); // данные по айди
    if(obj) {
      obj.count = duplicates[key]; //добавляем количество
      ingredientsInOrderData.push(obj); // пушим в пустой массив
    }
  };
  let totalPrice = 0;
  const orderIngrDetail = useMemo(() => ingredientsInOrderData?.map(item => {
    totalPrice += item.price * item.count;
    return <Ingredient image={item.image_mobile} name={item.name} price={item.price} count={item.count} key={item._id}/>
}),[ingredientsInOrderData]);
  return  getMessage ? (    <div className={location.state === undefined ? style.container : undefined}>
      { location.state === undefined ? (<h3 className={style.title + " text text_type_digits-default"}>#{order.number}</h3>) 
      : (<h3 className={'text text_type_digits-default'}>#{order.number}</h3>)}
      <h2 className={`text text_type_main-medium mt-5 mb-2`}>{order.name}</h2>
      <span className={`${style.orderStatus} text text_type_main-default`}>{order.status}</span>
      <span className={`text text_type_main-medium mt-5`}>Состав:</span>
      <ul className={style.listIngr}>
        {orderIngrDetail }
      </ul>
      <div className={`${style.orderInfo} mt-10`}>
        <p className={`text text_type_main-default text_color_inactive`}>{orderDate}</p>
        <div className={style.orderTotal}>
          <span className={`${style.ingredientPrice} text text_type_digits-default`}>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>

      </div>
    </div>) : '';
}

export default OrderDetailInFeed