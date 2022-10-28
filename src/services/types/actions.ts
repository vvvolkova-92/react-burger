import { ALL_GET_INGREDIENTS_FAILURE, ALL_GET_INGREDIENTS_REQUEST, ALL_GET_INGREDIENTS_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, GET_ORDER_INFO_FAILURE, GET_ORDER_INFO_SUCCESS, GET_USERDATA_FAILURE, GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS, INPUT_USER_EMAIL, INPUT_USER_NAME, INPUT_USER_PASSWORD, INPUT_VERIFICATION_CODE, IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_CLEAN, IN_CONSTRUCTOR_MAIN, IN_MODAL_CLOSE_CARD, IN_MODAL_OPEN_HISTORY_ORDER_CARD, IN_MODAL_OPEN_INGREDIENT_CARD, IN_MODAL_OPEN_ORDER_CARD, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, ORDER_GET_ORDER_NUMBER_FAILURE, ORDER_GET_ORDER_NUMBER_SUCCESS, REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_REQUEST, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SET_CURRENT_HISTORY_ORDER, SET_CURRENT_INGREDIENT, REFRESH_TOKEN_SUCCESS, CHANGE_USERDATA_REQUEST, CHANGE_USERDATA_FAILURE, CHANGE_USERDATA_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, IN_CONSTRUCTOR_DELETE_INGREDIENT, IN_CONSTRUCTOR_MOVE_INGREDIENT, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_CONNECTION_CLOSE, WS_GET_MESSAGE, WS_GET_USER_ORDERS, WS_CONNECTION_START } from '../types';
import { IAnswerOrderNumber, IIngredient, IWebSocketMessages, IWebSocketUserMessages, TOrderData, TUserInfo } from "./interfaces";

type TCloseModal = {
  readonly type: typeof IN_MODAL_CLOSE_CARD
};

type TCleanConstructor = {
  readonly type: typeof IN_CONSTRUCTOR_CLEAN,
  readonly main: [],
  readonly bun: null,
};

type TBunsInconstructor = {
  readonly type: typeof IN_CONSTRUCTOR_BUNS,
  readonly bun: IIngredient | null,
};

type TMainIngrInconstructor = {
  readonly type: typeof IN_CONSTRUCTOR_MAIN,
  readonly main: IIngredient[],
};

type TInconstructorDeleteIngredient = {
  readonly type: typeof IN_CONSTRUCTOR_DELETE_INGREDIENT,
  readonly main: IIngredient[],
};

type TInconstructorMoveIngredient = {
  readonly type: typeof IN_CONSTRUCTOR_MOVE_INGREDIENT,
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
  readonly name: string,
  readonly number: number,
  readonly status: number | string,
  readonly ingredients: object[],
  readonly createdAt: string,
};

type TCurrentIngredient = {
  readonly type: typeof SET_CURRENT_INGREDIENT,
  readonly name: string,
  readonly image: string | undefined,
  readonly image_large: string,
  readonly image_mobile: string,
  readonly calories: number,
  readonly proteins: number,
  readonly fat: null | number,
  readonly carbohydrates: number,
  readonly _id: string,
  readonly price: number,
};

export type TActions = TCloseModal
| TCleanConstructor
| TBunsInconstructor
| TMainIngrInconstructor
| TInconstructorDeleteIngredient
| TInconstructorMoveIngredient
| TGetAllIngrRequest
| TGetAllIngrSuccess
| TGetAllIngrFailed
| TOpenModalIngredient
| TOpenModalOrder
| TGetOrderNumber
| TGetOrderNumberFail
| TGetOrderInfo
| TGetOrderInfoFail
| TCurrentOrderInfo
| TCurrentIngredient
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

type TGetUserRequest = {
  readonly type: typeof GET_USERDATA_REQUEST,
};

type TGetUserSuccess = {
  readonly type: typeof GET_USERDATA_SUCCESS;
  readonly data: TUserInfo;
};

type TGetUserFail = {
  readonly type: typeof GET_USERDATA_FAILURE,
  readonly error: string;
};

type TCleanInputEmail = {
  readonly type: typeof INPUT_USER_EMAIL,
  readonly userEmail: string;
};

type TCleanInputName = {
  readonly type: typeof INPUT_USER_NAME,
  readonly userName: string;
};

type TCleanInputPasswrd = {
  readonly type: typeof INPUT_USER_PASSWORD,
  readonly userPassword: string;
};

type TInputVerCode = {
  readonly type: typeof INPUT_VERIFICATION_CODE,
  readonly verificationCode: string;
};

type TRefreshTokenRequest = {
  readonly type: typeof REFRESH_TOKEN_REQUEST,
};

type TRefreshTokenSuccess = {
  readonly type: typeof REFRESH_TOKEN_SUCCESS,
  readonly data: object;
};

type TRefreshTokenFail = {
  readonly type: typeof REFRESH_TOKEN_FAILURE,
  readonly error: string;
};

type TChangeUserdataRequest = {
  readonly type: typeof CHANGE_USERDATA_REQUEST,
};

type TChangeUserdataSuccess = {
  readonly type: typeof CHANGE_USERDATA_SUCCESS,
  readonly data: TUserInfo;
};

type TChangeUserdataFail = {
  readonly type: typeof CHANGE_USERDATA_FAILURE,
  readonly error: string;
};

type TUserLogoutRequest = {
  readonly type: typeof LOGOUT_REQUEST,
};

type TUserLogoutSuccess = {
  readonly type: typeof LOGOUT_SUCCESS,
  readonly data: TUserInfo;
};

type TUserLogoutFail = {
  readonly type: typeof LOGOUT_FAILURE,
  readonly error: string;
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
| TGetUserRequest
| TGetUserSuccess
| TGetUserFail
| TCleanInputEmail
| TCleanInputName
| TCleanInputPasswrd
| TInputVerCode
| TRefreshTokenRequest
| TRefreshTokenSuccess
| TRefreshTokenFail
| TChangeUserdataRequest
| TChangeUserdataSuccess
| TChangeUserdataFail
| TUserLogoutRequest
| TUserLogoutSuccess
| TUserLogoutFail;

type TWSConnect = {
  readonly type: typeof WS_CONNECTION_START,
  readonly payload: any,
};

type TWSConnectSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS,
};

type TWSConnectError = {
  readonly type: typeof WS_CONNECTION_ERROR,
  readonly payload: any,
};

type TWSConnectClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED,
};

type TWSConnectClose = {
  readonly type: typeof WS_CONNECTION_CLOSE,
};

type TWSGetMessage = {
  readonly type: typeof WS_GET_MESSAGE,
  readonly payload: IWebSocketMessages,
};

type TWSUserOrders = {
  readonly type: typeof WS_GET_USER_ORDERS,
  readonly payload: IWebSocketUserMessages,
};

export type WSActions = TWSConnect
| TWSConnectSuccess
| TWSConnectError
| TWSConnectClosed
| TWSConnectClose
| TWSGetMessage
| TWSUserOrders;



