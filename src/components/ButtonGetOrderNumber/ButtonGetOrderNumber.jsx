import {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {BASEURL}  from '../../utils/constants';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {propTypesForIngridients} from '../../utils/constants';

async function getOrderNumber (url, postIngredients) {
  const res = await fetch(`${url}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'ingredients': postIngredients,
    })
  });
if (res.ok) return res.json();
return Promise.reject(res.status);
}


function ButtonGetOrderNumber({ingredients}) {

  const [order, setOrder] = useState(false);
  const [number, setNumber] = useState('');

    const postIngredients = ingredients.map (item => {
      return item._id;
    });

    const a = useCallback (
      () => {
        getOrderNumber(BASEURL, postIngredients)
          .then( number  => setNumber(number.order.number))
          .catch((err) => console.log(err))
        setOrder(true);
      },
      [ingredients],
    );
  return ( <>
    <Button type="primary" size="large" onClick={a}>
      Оформить заказ
    </Button>
    {order && (
      <Modal onClose = {() => {setOrder(false);
        setNumber('');
      }
      }>
        <OrderDetails orderNumber={String(number)}/>
      </Modal> ) 
    }
  </>
  )
}

ButtonGetOrderNumber.propTypes = {
  ingredients: PropTypes.arrayOf(propTypesForIngridients),
};


export default ButtonGetOrderNumber 