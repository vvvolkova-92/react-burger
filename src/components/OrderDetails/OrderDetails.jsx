import PropTypes from 'prop-types';
import styles from './OrderDetails.module.css'
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import imageBackgroung from '../../images/graphics.png';


  function OrderDetails ({orderNumber}) {

    return (<div className={styles.container}>
      <span className={styles.number+ " text text_type_digits-large mb-8"}>{orderNumber}</span>
      <p className={" text text_type_main-medium mb-15"}>идентификатор заказа</p>
      <div 
        className={styles.icon + " mb-15"} 
        style={{backgroundImage: `url(${imageBackgroung})`,
        objectFit: 'cover',
        objectPosition: 'center',
        }}>
      </div>
      <span className={styles.checkicon}><CheckMarkIcon type="primary" /></span>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
  </div>
  )}
  OrderDetails.propTypes = {
    orderNumber: PropTypes.string.isRequired,
  };

export default OrderDetails; 


  