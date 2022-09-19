import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_SEND_MESSAGE, WS_CONNECTION_CLOSE } from '../services/types';

export const socketMiddleware = (wsUrl) => {
  return store => {
    let socket = null;
    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      const data = getState().socketReducer;

      if (type === WS_CONNECTION_START) {
        // объект класса WebSocket
        console.log('WS_CONNECTION_START');
        socket = new WebSocket(payload);
      }
      if (type === WS_CONNECTION_CLOSE) {
        // объект класса WebSocket
        socket.close('1000');
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          console.log('WS_CONNECTION_SUCCESS');
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };
        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          console.log('WS_CONNECTION_ERROR');
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };
        // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          const { data } = event;
          console.log('WS_GET_MESSAGE');
          dispatch({ type: WS_GET_MESSAGE, payload: JSON.parse(data) });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          console.log('WS_CONNECTION_CLOSED');
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

      // if (type === WS_SEND_MESSAGE) {
      //     // функция для отправки сообщения на сервер
      //     socket.send(JSON.stringify(message));
      // }
    }
    next(action);
    };
  };
}; 