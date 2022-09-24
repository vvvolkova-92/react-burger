export const socketMiddleware = (wsTypes) => {
  return store => {
    let socket = null;
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsTypes.start) {
        // объект класса WebSocket
        console.log('WS_CONNECTION_START');
        socket = new WebSocket(payload);
      }
      if (type === wsTypes.close) {
        // объект класса WebSocket
        socket.close('1000');
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          console.log('WS_CONNECTION_SUCCESS');
          dispatch({ type: wsTypes.sucess, payload: event });
        };
        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          console.log('WS_CONNECTION_ERROR');
          dispatch({ type: wsTypes.error, payload: event });
        };
        // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          const { data } = event;
          console.log('WS_GET_MESSAGE');
          dispatch({ type: wsTypes.getMes, payload: JSON.parse(data) });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          console.log('WS_CONNECTION_CLOSED');
          dispatch({ type: wsTypes.closed, payload: event });
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