import React, { useState } from "react";
import { nanoid } from 'nanoid';
import styles from './IngredientsCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsCard ({imglink, price, name, id} : any) {
    return ( <li className={styles.card + " ml-4 mr-6"} key={id}>

      {/* <img src={imglink} alt={name} className={styles.image + " pl-4"}/> */}
      <img src={imglink} alt={name} className={styles.image}/>
      <div className={styles.price}>
        <span className="pr-2 mt-1 mb-1 text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={styles.title}>{name}</p>
      <Counter count={1} size="default"/>
    </li>
    )

  }

export default IngredientsCard; 


  