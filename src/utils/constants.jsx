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
];

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.json());
};

export function getMessage(message) {
  switch (message) {
    case 'User already exists':
      return 'Пользователь уже зарегистрирован 🙀';
    case 'email or password are incorrect':
      return 'Почта или пароль не верны, попробуйте еще раз';
    case 'Email, password and name are required fields':
      return 'Все поля обязательны для заполнения';
    case 'Reset email sent':
      return 'Ссылка для сброса пароля отправлена на вашу почту';
    case 'Invalid credentials provided':
      return 'Данные не корректны, проверьте правильность ввода данных';
    case 'Password successfully reset':
      return 'Пароль успешно сброшен';
    default:
      return message
  }
};

export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};


export function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1,
  })
};