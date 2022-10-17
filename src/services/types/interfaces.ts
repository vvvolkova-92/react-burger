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
  counter: number;
  fat: number;
  calories: number;
  proteins: number;
  carbohydrates: number;
  index: number;
}

export interface ICurrentIngredient {
  _id: string | undefined;
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


export interface IOrder {
  ingredients: object[];
  number: number;
  name: string;
  status: string;
  createdAt: string;
}

export type TOrderData = {
  orders: IOrder[],
}