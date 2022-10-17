import { ALL_GET_INGREDIENTS_FAILURE, ALL_GET_INGREDIENTS_REQUEST, ALL_GET_INGREDIENTS_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, GET_ORDER_INFO_FAILURE, GET_ORDER_INFO_SUCCESS, INPUT_VERIFICATION_CODE, IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_CLEAN, IN_CONSTRUCTOR_MAIN, IN_MODAL_CLOSE_CARD, IN_MODAL_OPEN_HISTORY_ORDER_CARD, IN_MODAL_OPEN_INGREDIENT_CARD, IN_MODAL_OPEN_ORDER_CARD, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, ORDER_GET_ORDER_NUMBER_FAILURE, ORDER_GET_ORDER_NUMBER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SET_CURRENT_HISTORY_ORDER, SET_CURRENT_INGREDIENT } from "../types";
import { IAnswerOrderNumber, IIngredient, TOrderData, TUserInfo } from "./interfaces";


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

export type TActions = TCloseModal
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

type TRegRequest = {
  readonly type: typeof REGISTER_REQUEST,
};

type TRegSuccess = {
  readonly type: typeof REGISTER_SUCCESS,
  readonly data: object,
};

type TRegFail = {
  readonly type: typeof REGISTER_FAILURE,
  readonly error: string,
};

type TRemindPswrdRequest = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST,
};

type TRemindPswrdSuccess = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS,
  readonly data: object,
};

type TRemindPswrdFail = {
  readonly type: typeof FORGOT_PASSWORD_FAILURE,
  readonly error: string,
};

export type TVerificationCode = {
  readonly type: typeof INPUT_VERIFICATION_CODE,
  readonly verificationCode: string,
};

type TChangePasswordRequest = {
  readonly type: typeof RESET_PASSWORD_REQUEST,
};

type TChangePasswordSuccess = {
  readonly type: typeof RESET_PASSWORD_SUCCESS,
  readonly data: object,
};

type TChangePasswordFail = {
  readonly type: typeof RESET_PASSWORD_FAILURE,
  readonly error: string,
};

type TLogin = {
  readonly type: typeof LOGIN_REQUEST,
};

type TLoginSuccess = {
  readonly type: typeof LOGIN_SUCCESS,
  readonly data: TUserInfo,
};

type TLoginFail = {
  readonly type: typeof LOGIN_FAILURE,
  readonly error: string,
};


export type TUserAction = TRegRequest
| TRegSuccess
| TRegFail
| TRemindPswrdRequest
| TRemindPswrdSuccess
| TRemindPswrdFail
| TChangePasswordRequest
| TChangePasswordSuccess
| TChangePasswordFail
| TLogin
| TLoginSuccess
| TLoginFail