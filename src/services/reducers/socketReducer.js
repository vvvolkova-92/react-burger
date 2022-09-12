import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from '../types.js';

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined,
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
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
