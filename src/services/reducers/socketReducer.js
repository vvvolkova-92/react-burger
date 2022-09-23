import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_CONNECTION_CLOSE } from '../types.js';

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined,
  close: false,
  getMessage: false,
};

export const socketReducer = (state = initialState, action) => {
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
