import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
export const BASEURL = 'https://norma.nomoreparties.space/api';
export const MODAL = document.getElementById('modal');
export const WSURL = 'wss://norma.nomoreparties.space/orders';
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

export function deleteCookie(name, value) {
  return setCookie(name, value, {
    'max-age': -1,
  })
};

//данные для заказов
export const ordersData = {
  success: true,
  orders: [
    {
      _id: "6153777da0dd75001c70820c",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
      ],
      status: "done",
      name: "Space флюоресцентный бургер",
      createdAt: "2021-09-28T20:13:49.850Z",
      updatedAt: "2021-09-28T20:13:49.997Z",
      number: 4072,
    },
    {
      _id: "61536af6a0dd75001c7081f3",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Антарианский флюоресцентный бургер",
      createdAt: "2021-09-28T19:20:22.575Z",
      updatedAt: "2021-09-28T19:20:22.669Z",
      number: 4071,
    },
    {
      _id: "61536a28a0dd75001c7081ef",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Space флюоресцентный бургер",
      createdAt: "2021-09-28T19:16:56.083Z",
      updatedAt: "2021-09-28T19:16:56.205Z",
      number: 4070,
    },
    {
      _id: "615369e8a0dd75001c7081ee",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Spicy флюоресцентный бургер",
      createdAt: "2021-09-28T19:15:52.557Z",
      updatedAt: "2021-09-28T19:15:52.640Z",
      number: 4069,
    },
    {
      _id: "61536891a0dd75001c7081ed",
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733c6",
      ],
      status: "done",
      name: "Краторный минеральный люминесцентный экзо-плантаго space бургер",
      createdAt: "2021-09-28T19:10:09.067Z",
      updatedAt: "2021-09-28T19:10:09.174Z",
      number: 4068,
    },
    {
      _id: "6153658ea0dd75001c7081ea",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Space флюоресцентный бургер",
      createdAt: "2021-09-28T18:57:18.500Z",
      updatedAt: "2021-09-28T18:57:18.674Z",
      number: 4067,
    },
    {
      _id: "6153647ea0dd75001c7081e7",
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733d2",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733c6",
      ],
      status: "done",
      name: "Краторный бессмертный метеоритный альфа-сахаридный минеральный астероидный люминесцентный фалленианский антарианский экзо-плантаго space био-марсианский бургер",
      createdAt: "2021-09-28T18:52:46.941Z",
      updatedAt: "2021-09-28T18:52:47.069Z",
      number: 4066,
    },
    {
      _id: "61536258a0dd75001c7081e3",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Space флюоресцентный бургер",
      createdAt: "2021-09-28T18:43:36.475Z",
      updatedAt: "2021-09-28T18:43:36.589Z",
      number: 4065,
    },
    {
      _id: "615361f4a0dd75001c7081e2",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733cb",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Фалленианский антарианский био-марсианский флюоресцентный бургер",
      createdAt: "2021-09-28T18:41:56.047Z",
      updatedAt: "2021-09-28T18:41:56.153Z",
      number: 4064,
    },
    {
      _id: "61536184a0dd75001c7081de",
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733c6",
      ],
      status: "done",
      name: "Краторный традиционный-галактический метеоритный астероидный бургер",
      createdAt: "2021-09-28T18:40:04.100Z",
      updatedAt: "2021-09-28T18:40:04.266Z",
      number: 4063,
    },
    {
      _id: "61536080a0dd75001c7081dc",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Люминесцентный флюоресцентный бургер",
      createdAt: "2021-09-28T18:35:44.654Z",
      updatedAt: "2021-09-28T18:35:44.731Z",
      number: 4062,
    }, 
  ],
    total: 3985,
    totalToday: 50,
  };