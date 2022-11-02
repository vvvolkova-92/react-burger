import { INPUT_USER_NAME, INPUT_USER_PASSWORD, INPUT_USER_EMAIL, INPUT_VERIFICATION_CODE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS, GET_USERDATA_FAILURE,
  CHANGE_USERDATA_REQUEST, CHANGE_USERDATA_SUCCESS, CHANGE_USERDATA_FAILURE,
  REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE, WS_CONNECTION_START, WS_CONNECTION_CLOSE,
} from '../types';
import { checkResponse, setCookie, getCookie, deleteCookie } from '../../utils/constants';
import {BASEURL} from '../../utils/constants';
import { IUserData, TUserInfo } from '../types/interfaces';
import { RouteComponentProps } from 'react-router-dom';
import { TUserAction, TVerificationCode } from '../types/actions';
import React from 'react';
import { AppDispatch } from '../types/index';
// AC регистрации пользователя
export function userRegistration(data: IUserData, history: RouteComponentProps["history"]) {
  const { userName, userEmail, userPassword } = data;
  return function (dispatch: AppDispatch) {
    (async () => {
      try {
        dispatch({
          type: REGISTER_REQUEST,
        });
        const res = await fetch(`${BASEURL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            name: userName,
          })
        })
          .then( res => checkResponse(res))
          .then( res => {
            dispatch({
              type: REGISTER_SUCCESS,
              data: res,
            });
            history.replace({ pathname: '/login' });
          })
      }
      catch (error: any) {
        let err = await error;
        dispatch({
          type: REGISTER_FAILURE,
          error: err.message,
        });
      }
    })();
  }
};
// AC восстановление пароля
export function remindPassword(email: string, history: RouteComponentProps["history"]) {
  return function (dispatch: AppDispatch) {
    (async () => {
      try {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
        });
        const res = await fetch(`${BASEURL}/password-reset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email
          })
        })
          .then( res => checkResponse(res))
          .then( res => {
            dispatch({
              type: FORGOT_PASSWORD_SUCCESS,
              data: res,
            });
            history.replace({ pathname: "/reset-password" });
          })
      }
      catch (error: any) {
        let err = await error;
        dispatch({
          type: FORGOT_PASSWORD_FAILURE,
          error: err.message,
        });
      }
    })();
  }
}
//А проверочный код
export const verifity = (evt: React.ChangeEvent<HTMLInputElement>):TVerificationCode => {
  return {
    type: INPUT_VERIFICATION_CODE,
    verificationCode: evt.target.value,
  }
};

//AC изменения пароля
export function changePassword(newUserPassword: string, verificationCode: string, history: RouteComponentProps["history"]) {
  return function (dispatch: AppDispatch) {
    (async () => {
      try {
        dispatch({
          type: RESET_PASSWORD_REQUEST,
        });
        const res = await fetch(`${BASEURL}/password-reset/reset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password: newUserPassword,
            token: verificationCode,
          })
        })
          .then( res => checkResponse(res))
          .then( res => {
            dispatch({
              type: RESET_PASSWORD_SUCCESS,
              data: res,
            });
            history.replace({ pathname: "/login" });
          })
      }
      catch (error: any) {
        let err = await error;
        dispatch({
          type: RESET_PASSWORD_FAILURE,
          error: err.message,
        });
      }
    })();
  }
};
//АС авторизация юзера
export function userLogin(data: {userEmail: string, userPassword: string}) {
  const { userEmail, userPassword } = data;
  return function (dispatch: AppDispatch) {
    (async () => {
      try {
        dispatch({
          type: LOGIN_REQUEST,
        });
        const res = await fetch(`${BASEURL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
          })
        })
          .then( res => checkResponse(res))
          .then( res => {
            const token = res.accessToken.split('Bearer ')[1];
            //время жизни куки 20 минут
            setCookie('accessToken', token, {secure: true, 'max-age': 1200});
            document.cookie = `refreshToken=${res.refreshToken}; path=/`;
            dispatch({
              type: LOGIN_SUCCESS,
              data: res,
            });
          })
      }
      catch (error: any) {
        let err = await error;
        dispatch({
          type: LOGIN_FAILURE,
          error: err.message,
        });
      }
    })();
  }
};

//AC получения данных юзера
export function getUserData() {
  const at = getCookie('accessToken');
  const rt = getCookie('refreshToken');
    return function (dispatch: AppDispatch) {
      (async () => {
        if (at === undefined) dispatch(refreshToken(rt, getUserData))
        else {
          try {
            dispatch({
              type: GET_USERDATA_REQUEST,
            });
            const res = await fetch(`${BASEURL}/auth/user`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + getCookie('accessToken'),
              },
            })
              .then( res => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject(res.json());
              })
              .then( res => {
                dispatch({
                  type: GET_USERDATA_SUCCESS,
                  data: res,
                });
                dispatch({
                  type: INPUT_USER_EMAIL,
                  userEmail: res.user.email,
                });
                dispatch({
                  type: INPUT_USER_NAME,
                  userName: res.user.name,
                });
                dispatch({
                  type: INPUT_USER_PASSWORD,
                  userPassword: "",
                });
              })
          }
          catch (error: any) {
            let err = await error;
            if (err.message === 'jwt expired') {

              const token = getCookie('refreshToken');
              dispatch(refreshToken(token,getUserData));}
            dispatch({
              type: GET_USERDATA_FAILURE,
              error: err.message,
            });
          }
        }

      })();
  }


};
//рефреш токен
export function refreshToken(token: string, getUserData: any): any {
  return function (dispatch: AppDispatch) {
    (async () => {
      try {
        dispatch({
          type: REFRESH_TOKEN_REQUEST,
        });
        const res = await fetch(`${BASEURL}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {
            token,
          }),
        })
          .then( res => checkResponse(res))
          .then( res => {
            dispatch({
              type: REFRESH_TOKEN_SUCCESS,
              data: res,
            });
            document.cookie = `accessToken=${res.accessToken.split("Bearer ")[1]}; path=/`;
            document.cookie = `refreshToken=${res.refreshToken}; path=/`;
            if (getUserData) dispatch(getUserData());
          })
      }
      catch (error: any) {
        let err = await error;
        dispatch({
          type: REFRESH_TOKEN_FAILURE,
          error: err.message,
        });
      }
    })();
  }
}
// АС если передумали изменить данные в профиле
export function dontEditProfile(userData: TUserInfo) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: INPUT_USER_EMAIL,
      userEmail: userData.user.email,
    });
    dispatch({
      type: INPUT_USER_NAME,
      userName: userData.user.name,
    });
    dispatch({
      type: INPUT_USER_PASSWORD,
      userPassword: "",
    });
  }
};
//АС изменить данные в профиле
export function editProfile(userName: string, userEmail: string, userPassword: string) {
  return function (dispatch: AppDispatch) {
    (async () => {
      try {
        dispatch({
          type: CHANGE_USERDATA_REQUEST,
        });
        const res = await fetch(`${BASEURL}/auth/user`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + getCookie('accessToken'),
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            name: userName,
          })
        })
          .then( res => checkResponse(res))
          .then( res => {
            dispatch({
              type: CHANGE_USERDATA_SUCCESS,
              data: res,
            });
          })
      }
      catch (error: any) {
        let err = await error;
        dispatch({
          type: CHANGE_USERDATA_FAILURE,
          error: err.message,
        });
      }
    })();
  }
};

//АС логаут
export function userLogout(history: RouteComponentProps["history"]) {
  const rt = getCookie('refreshToken');
  const at = getCookie('accessToken');
  return function (dispatch: AppDispatch) {
    (async () => {
      try {
        dispatch({
          type: LOGOUT_REQUEST,
        });
        const res = await fetch(`${BASEURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {
            token: rt,
          }),
        })
          .then( res => checkResponse(res))
          .then ( res => {
            deleteCookie('accessToken', at);
            deleteCookie('refreshToken', rt);
            dispatch({
              type: LOGOUT_SUCCESS,
              data: res,
            });
          })
            history.replace({ pathname: "/" });
      }
      catch (error: any) {
        let err = await error;
        dispatch({
          type: LOGOUT_FAILURE,
          error: err.message,
        });
      }
    })();
  }
};

export function ConnectionStart () {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `wss://norma.nomoreparties.space/orders?token=${getCookie(
          'accessToken')}`,
    });
  }
};

export function ConnectionClose () {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: WS_CONNECTION_CLOSE,
    });
  }
};





