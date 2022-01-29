import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
export const BASEURL = 'https://norma.nomoreparties.space/api';
export const ORDER_NUMBER = Math.floor(Math.random()*1000001);

export const propTypesForIngridients = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  proteins: PropTypes.number,
});

export const menuItems = [
  {id: nanoid(10), name: 'Булки', value: 'one'},
  {id: nanoid(10), name: 'Соусы', value: 'two'},
  {id: nanoid(10), name: 'Начинки', value: 'three'},
]
