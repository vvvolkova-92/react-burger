import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ReactNode } from 'react';

export interface IIngredient {
  id?: string;
  _id: string;
  name: string;
  key: string;
  type: string;
  price: number;
  image_mobile: string;
  image: string;
  image_large: string;
  count: number;
  fat: number;
  calories: number;
  proteins: number;
  carbohydrates: number;
  index: number;
}

export type TIngredientInConstructor = {
  id?: string | undefined,
  moveIngredient: (id : string | undefined, overIndex: number) => void,
  findIngredient: (id: string | undefined) => {
    ingredient: IIngredient;
    index: number;
  },
  name: string, 
  image: string, 
  price: number,
}

export type TIngredientsCard = {
  imglink: string,
  price: number,
  name: string,
  item: IIngredient,
}

export type TInputName = {
  icon?: keyof TICons | undefined,
  type?: string, 
  value?: string,
}

export type TInputEmail = TInputName & {
  placeholder: string, 
}

export type TInputPassword = {
  type?: string, 
}

export interface ICurrentIngredient {
  _id: string;
  name: string;
  type: string | undefined;
  price: number;
  image_mobile: string;
  image: string | undefined;
  image_large: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export interface IAnswerOrderNumber {
  order: { number: number }
}

export interface IMenuItem {
  id?: string,
  icon: TICons | keyof TICons | ReactNode,
  link: string,
  title: string,
  stylesComp: string,
  stylesText: string,
}
type TChildren = {
  children?: React.ReactNode
}
export type TModal = {
  title?: string,
  children?: TChildren,
  closeModal: () => void,
}

export type TModalClose = {
  onClose: () => void
}

export type IngredientInOrder = {
  name: string,
  image: string,
  price: number,
  count: number,
}
 export type TOrderDetail =  () => JSX.Element | "";

export interface IOrder {
  _id: string,
  ingredients: object[];
  number: number;
  name: string;
  status: string;
  createdAt: string;
}

export type TOrderData = {
  orders: IOrder[] | undefined,
}

export type TOrderInFeed = {
  inProfile?: boolean,
  status: string, 
  _id: string, 
  ingredients: object[], 
  name: string, 
  createdAt: string, 
  number: number, 
  onClick: (evt: any) => void,
}

export interface IUserData {
  userName: string; 
  userEmail: string; 
  userPassword: string;
}

interface IUser {
  email: string;
  name: string;
  password: string;
}

export type TUserInfo = {
  user: IUser
}

export interface IWebSocketMessages {
  orders: IOrder[];
  total: number;
  totalToday: number;
  message: string;
};

export interface IWebSocketUserMessages extends IWebSocketMessages {};

export type TRouteLogin = {
  children: React.ReactNode,
  path?: string; 
  exact?: boolean;
}

export interface ILocationState {
  background: ILocationState;
  from: {
    pathname: string,
  }
  pathname?: string, 
  search: string, 
  state: string, 
  hash: string,
}

export type TButton = typeof Button & {
  form: string,
};

export type TComplete = {
  title: string,
  number: number,
}

export interface IWsTypes {
  start: 'WS_CONNECTION_START',
  sucess: 'WS_CONNECTION_SUCCESS',
  error: 'WS_CONNECTION_ERROR',
  closed: 'WS_CONNECTION_CLOSED',
  close: 'WS_CONNECTION_CLOSE',
  getMes: 'WS_GET_MESSAGE',
  getUsrOrd: 'WS_GET_USER_ORDERS',
  sendMes: 'WS_SEND_MESSAGE',
};

export type IWsEvent = IWebSocketMessages | IWebSocketUserMessages;