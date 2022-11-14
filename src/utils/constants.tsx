import { nanoid } from 'nanoid';
export const BASEURL = 'https://norma.nomoreparties.space/api';
export const MODAL = document.getElementById('modal')!;
export const WSURL = 'wss://norma.nomoreparties.space/orders';

export const menuItems = [
  {id: nanoid(10), name: 'Булки', value: 'one'},
  {id: nanoid(10), name: 'Соусы', value: 'two'},
  {id: nanoid(10), name: 'Начинки', value: 'three'},
];


export function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.json());
};

export function getMessage(message: string):string {
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

export function getCookie(name: string): string {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : 'undefined';
};


export function setCookie(name: string, value: string, options: any = {}) {

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

export function deleteCookie(name: string, value: string) {
  return setCookie(name, value, {
    'max-age': -1,
  })
};