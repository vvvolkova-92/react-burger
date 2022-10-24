import { IWsEvent, IWsTypes } from "./types/interfaces";

export const socketMiddleware = (wsTypes: IWsTypes) => {
  return (store: any) => {
    let socket: any = null;
    return (next: any) => (action: any) => {
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
        socket.onopen = (event: IWsEvent) => {
          console.log('WS_CONNECTION_SUCCESS');
          dispatch({ type: wsTypes.sucess, payload: event });
        };
        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event: IWsEvent) => {
          console.log('WS_CONNECTION_ERROR');
          dispatch({ type: wsTypes.error, payload: event });
        };
        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event: IWsEvent) => {
          const { data } = event;
          console.log('WS_GET_MESSAGE');
          dispatch({ type: wsTypes.getMes, payload: JSON.parse(data) });
          dispatch({ type: wsTypes.getUsrOrd, payload: JSON.parse(data) });
        };
        // socket.onmessage = event => {
        //   const { data } = event;
        //   console.log('WS_GET_USER_ORDERS');
        //   dispatch({ type: wsTypes.getUsrOrd, payload: JSON.parse(data) });
        // };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event: IWsEvent) => {
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