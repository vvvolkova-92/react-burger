import React from "react";
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
function BurgerConstructor ({data} : any) {
  const someIngr = data.slice(1,7).map((item: any) => {
    return (<li className=" mt-4 mb-4">
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
      />
    </li>
    )
  });
  return ( <>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="pt-25">
    <div className={styles.item}>
    <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
      />
    </div>
    {/* дальше то, то можно изменить! и для этого блока скрол */}
    <ul className={styles.list}>
      {someIngr}
    </ul>
    <div className={styles.item}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
      />
    </div>
    </div>
    </>
    );
  }

export default BurgerConstructor 