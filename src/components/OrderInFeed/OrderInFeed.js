import React from 'react';
//сторонние компоненты
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//стили
import style from './OrderInFeed.module.css';


export default function OrderInFeed({status}) {
  //хардкод
  const orderNumber = '123439';
  const orderDate = 'Сегодня, 16:20 i-GMT+3';
  const burgerName = 'Death Star Starship Main бургер';
  const orderStatus = 'Готовится';
  const ingredient = [
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 1},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 12},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 133},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 22},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 1},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 22},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 333},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 44},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 55},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 9},
    {name: 'Blablabla', image: 'https://code.s3.yandex.net/react/code/bun-02.png', price: 88},
  ];
  //для неактивной карточки ингредиента
  let count = 0;
  let total = 0;
  let noActiveCard;
  //для активных карточек ингредиента
  const ingredients = ingredient.map((ingr, index) => {
    let cards;
    if (index < 5 ) {
      cards = (      
        <li key={index} className={style.ingredientsList} style={{zIndex: 100-index}}>
          <img src={ingr.image} alt={ingr.name} className={style.ingredientImage} key={index}/>
      </li>
      )
    } 
    else {
      count = index - 5;
      noActiveCard = (      
        <li key={index} className={`text text_type_main-default ${style.ingredientsList}`} style={{zIndex: 100-index}} data-count={`+${count}`}>
          <img src={ingr.image} alt={ingr.name} className={style.ingredientImageNoActive} key={index}/>
      </li>
      )
    };
    total += ingr.price;
    return cards;
  });
  ingredients.push(noActiveCard);
  return (
    <li className={`${style.orderContainer} mt-4`}>
      <div className={style.orderInfo}>
        <span className={`${style.orderNumber} text text_type_digits-default`}>#{orderNumber}</span>
        <p className={`text text_type_main-default text_color_inactive`}>{orderDate}</p>
      </div>
      <p className={`text text_type_main-medium mt-6 mb-2`}>{burgerName}</p>
      {status && (<span className={`${style.orderStatus} text text_type_main-default`}>{orderStatus}</span>)}
      <div className={style.orderDetail}>
        <ul className={`${style.orderCompound} mt-6`}>
          {ingredients}
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