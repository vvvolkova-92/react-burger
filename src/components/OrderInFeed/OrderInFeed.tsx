import React, { FC, useMemo } from 'react';
import { useSelector } from '../../services/types/hooks';
//сторонние компоненты
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//стили
import style from './OrderInFeed.module.css';
import { TOrderInFeed } from '../../services/types/interfaces';

const OrderInFeed: FC<TOrderInFeed> = ({inProfile, status, _id, ingredients, name, createdAt, number, onClick}) => {

  const orderDate = new Date(createdAt).toLocaleString();

  const data = useSelector (store => store.ingredients.ingredients);
  //для неактивной карточки ингредиента
  let total = 0;
  let count = 0;
  let noActiveCard;
  //для активных карточек ингредиента
  const activeIngredients = useMemo( () => ingredients.map((ingr, index) => {
    const ingredientsData = data.filter((element: any) => element._id === ingr);
    let activeCards;
      const image = ingredientsData[0]?.image_mobile;
      const name = ingredientsData[0]?.name;
      const price = ingredientsData[0]?.price;
      if (index < 5 ) {
        activeCards = (      
          <li className={style.ingredientsList} style={{zIndex: 100-index}} key={`activeIng-${ingr}-${index}`}>
            <img src={image} alt={name} className={style.ingredientImage} key={`activeIngImg-${ingr}`}/>
          </li>
        )
      } 
      else {
        count = index - 5;
        noActiveCard = (      
          <li className={`text text_type_main-default ${style.ingredientsList}`} style={{zIndex: 100-index}} data-count={`+${count}`} key={`noActiveIng-${ingr}${index}`}>
            <img src={image} alt={name} className={style.ingredientImageNoActive} key={`noActiveIngImg-${ingr}`}/>
          </li>
        )
      };
      total += price;
    return activeCards;
  }), [ingredients]);
  activeIngredients.push(noActiveCard);
  return (
    <li className={`${inProfile ? style.orderContainerSmall : style.orderContainer} mt-4`} key={`order-${_id}`} onClick={onClick} id={_id}>
      <div className={style.orderInfo}>
        <span className={`${style.orderNumber} text text_type_digits-default`}>#{number}</span>
        <p className={`text text_type_main-default text_color_inactive`}>{orderDate}</p>
      </div>
      <p className={`text text_type_main-medium mt-6 mb-2`}>{name}</p>
      {!inProfile && (<span className={`${style.orderStatus} text text_type_main-default`}>{status}</span>)}
      <div className={style.orderDetail}>
        <ul className={`${style.orderCompound} mt-6`}>
          {activeIngredients}
        </ul>
        <div className={style.orderPriceContainer}>
          <span className={`text text_type_digits-default ${style.orderPrice}`}> {total}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default OrderInFeed;