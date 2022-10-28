import { useMemo, useEffect, FC } from 'react';
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { useSelector, useAppDispatch } from '../../services/types/hooks';
//сторонние компоненты 
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//мои
import { getCookie } from '../../utils/constants';
import { getOrder } from '../../services/actions/orderAction';
//стили
import style from './OrderDetailInFeed.module.css';
import { IIngredient, IngredientInOrder } from '../../services/types/interfaces';

 const Ingredient: FC<IngredientInOrder> = ({image, name, price, count}) => {
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

const OrderDetailInFeed: FC = () => {
  const dispatch = useAppDispatch();
  const { messages, wsConnected } = useSelector((state) => state.socketReducer);
  const { data } = useSelector(state => state.modalReducer);
  const orders = wsConnected ? messages?.orders : data?.orders;
  const { id } = useParams<{id: string}>();
  const location = useLocation();
  const { path} = useRouteMatch();
  const url = path === "/profile/orders/:id"
    ? `/orders?token=${getCookie('accessToken')}`
    : "/orders/all";

  useEffect(() => {
    !wsConnected && dispatch(getOrder(url));
  }, []);

  const order = useMemo(() => {
    return orders?.find((order) => order._id === id);
  }, [orders, id]);
  // const {name, number, status, ingredients, createdAt } = order;
  const orderDate = new Date(order!.createdAt).toLocaleString();
  const allIngr = useSelector (store => store.ingredients.ingredients);
  //считаем дубли и получаем данные по айди ингредиенты
  const sortIngredients = order?.ingredients.sort(); //сортировка массива
  const duplicates: any[] = [];
  sortIngredients?.forEach((element: any) => { 
    duplicates[element] = duplicates[element] + 1 || 1; //получаем пару ключ - значение на дубли
  });
  let ingredientsInOrderData: IIngredient[] = []; // на выходе будет массив ингредиентов (картинки и т.д.) с количеством без дублей
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
  return  orders ? (    <div className={location.state === undefined ? style.container : undefined}>
      { location.state === undefined ? (<h3 className={style.title + " text text_type_digits-default"}>#{order!.number}</h3>) 
      : (<h3 className={'text text_type_digits-default'}>#{order!.number}</h3>)
      }
      <h2 className={`text text_type_main-medium mt-5 mb-2`}>{order!.name}</h2>
      <span className={`${style.orderStatus} text text_type_main-default`}>{order!.status}</span>
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
    </div>): null;
}

export default OrderDetailInFeed