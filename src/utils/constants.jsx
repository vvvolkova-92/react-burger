import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
export const BASEURL = 'https://norma.nomoreparties.space/api';
export const MODAL = document.getElementById('modal');

export const propTypesForIngridients = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
});

export const menuItems = [
  {id: nanoid(10), name: 'Булки', value: 'one'},
  {id: nanoid(10), name: 'Соусы', value: 'two'},
  {id: nanoid(10), name: 'Начинки', value: 'three'},
]
