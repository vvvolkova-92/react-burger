import { IAnswerOrderNumber, IIngredient, IOrder, IWebSocketMessages, IWebSocketUserMessages, TOrderData, TUserInfo } from "./interfaces"

export type TInputState = {
  userName: string,
  userEmail: string,
  userPassword: string,
  verificationCode: string,
}

export type TUserState = {
  userData: null| TUserInfo,
  hasError: boolean,
  isLoading: boolean,
  error: null | string,
  isLogin: boolean,
  isLoadingUser: boolean,
  tokenRefresh: null | object,
  refresh: boolean,
  refreshFail: boolean,
}

export type TRegistrationState = {
  registrationData: null | object,
  hasError: boolean,
  isLoading: boolean,
  error: null | string,
};

export type TPasswordResetState = {
  result: {
    message?: string,
  },
  sendLetter: boolean,
  hasError: boolean,
  isLoading: boolean,
  error: null | string,
};

export type TConstructorState = {
  bun: null | IIngredient,
  main: IIngredient[],
};

export type TCurrentIngredientState = {
  name: string,
  image: undefined | null | string,
  image_large: null | string,
  image_mobile: null | string,
  calories: null | number,
  proteins: null | number,
  fat: null | number,
  carbohydrates: null | number,
  _id: string,
  type: null | string,
  price: null | number,
};

export type TGetIngredientsState = {
  ingredients: IIngredient[],
  isFetching: boolean,
  total: null | number,
  ingredientsReady: boolean,
};

export type TModalState = {
  ingredientCardModal: boolean,
  orderModal: boolean,
  historyOrderModal: boolean,
  closeModal: boolean,
  data: null | IOrder[],
}

export type TOrderState = {
  order: null | IAnswerOrderNumber,
};

export type THistoryOrderState = {
  name: string,
  number: undefined | number,
  status: undefined | number | string,
  ingredients: string[],
  createdAt: undefined | string,
  totalPrice: null| number,
};

export type TSocketState = {
  wsConnected: boolean,
  messages: null | IWebSocketMessages,
  userOrder: null | IWebSocketUserMessages,
  getUserOrders: boolean,
  error: undefined | string,
  close: boolean,
  getMessage: boolean,
};
