import { ALL_GET_INGREDIENTS_FAILURE, ALL_GET_INGREDIENTS_REQUEST, ALL_GET_INGREDIENTS_SUCCESS, GET_ORDER_INFO_FAILURE, GET_ORDER_INFO_SUCCESS, IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_CLEAN, IN_CONSTRUCTOR_MAIN, IN_MODAL_CLOSE_CARD, IN_MODAL_OPEN_HISTORY_ORDER_CARD, IN_MODAL_OPEN_INGREDIENT_CARD, IN_MODAL_OPEN_ORDER_CARD, ORDER_GET_ORDER_NUMBER_FAILURE, ORDER_GET_ORDER_NUMBER_SUCCESS, SET_CURRENT_HISTORY_ORDER, SET_CURRENT_INGREDIENT } from "../types";
import { IAnswerOrderNumber, IIngredient, TOrderData } from "./interfaces";


type TCloseModal = {
  readonly type: typeof IN_MODAL_CLOSE_CARD
};

type TCleanConstructor = {
  readonly type: typeof IN_CONSTRUCTOR_CLEAN,
  readonly main: [],
  readonly bun: string,
};

type TBunsInconstructor = {
  readonly type: typeof IN_CONSTRUCTOR_BUNS,
  readonly bun: IIngredient | null,
};

type TMainIngrInconstructor = {
  readonly type: typeof IN_CONSTRUCTOR_MAIN,
  readonly main: IIngredient[],
};

type TGetAllIngrRequest = {
  readonly type: typeof ALL_GET_INGREDIENTS_REQUEST
};

type TGetAllIngrSuccess = {
  readonly type: typeof ALL_GET_INGREDIENTS_SUCCESS,
  readonly ingredients: IIngredient[]
};

type TGetAllIngrFailed = {
  readonly type: typeof ALL_GET_INGREDIENTS_FAILURE,
};

type TSetCurrentIngredient = {
  readonly type: typeof SET_CURRENT_INGREDIENT
};

type TOpenModalIngredient = {
  readonly type: typeof IN_MODAL_OPEN_INGREDIENT_CARD,
  readonly open: boolean
};

type TOpenModalOrder = {
  readonly type: typeof IN_MODAL_OPEN_ORDER_CARD,
  readonly open: boolean
};

type TOpenModalHistoryOrder = {
  readonly type: typeof IN_MODAL_OPEN_HISTORY_ORDER_CARD,
  readonly open: boolean
};

type TGetOrderNumber = {
  readonly type: typeof ORDER_GET_ORDER_NUMBER_SUCCESS,
  readonly order: IAnswerOrderNumber,
};

type TGetOrderNumberFail = {
  readonly type: typeof ORDER_GET_ORDER_NUMBER_FAILURE,
  readonly order: any,
};

type TGetOrderInfo = {
  readonly type: typeof GET_ORDER_INFO_SUCCESS,
  readonly order: TOrderData,
};

type TGetOrderInfoFail = {
  readonly type: typeof GET_ORDER_INFO_FAILURE,
  readonly order: any,
};

type TCurrentOrderInfo = {
  readonly type: typeof SET_CURRENT_HISTORY_ORDER,
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly ingredients: object[];
  readonly createdAt: string;
};



type TActions = TCloseModal
| TCleanConstructor
| TBunsInconstructor
| TMainIngrInconstructor
| TGetAllIngrRequest
| TGetAllIngrSuccess
| TGetAllIngrFailed
| TSetCurrentIngredient
| TOpenModalIngredient
| TOpenModalOrder
| TGetOrderNumber
| TGetOrderNumberFail
| TGetOrderInfo
| TGetOrderInfoFail
| TCurrentOrderInfo
| TOpenModalHistoryOrder;

export default TActions;