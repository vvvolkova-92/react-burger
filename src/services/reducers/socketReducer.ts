import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_CONNECTION_CLOSE, WS_GET_USER_ORDERS } from '../types';
import { WSActions } from '../types/actions';
import { TSocketState } from '../types/redusers';

const initialState: TSocketState = {
  wsConnected: false,
  messages: null,
  userOrder: null,
  getUserOrders: false,
  error: undefined,
  close: false,
  getMessage: false,
};

export const socketReducer = (state = initialState, action: WSActions): TSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        error: undefined,
        close: false,
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        getMessage: true,
        messages: action.payload,
        error: undefined,
      };
    }
    case WS_GET_USER_ORDERS: {
      return {
        ...state,
        getUserOrders: true,
        userOrder: action.payload,
        error: undefined,
      };
    }
    case WS_CONNECTION_CLOSE: {
      return {
        ...state,
        close: true,
      };
    }
    default: {
      return state;
    }
  }
};
