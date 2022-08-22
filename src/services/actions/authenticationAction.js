import { INPUT_USER_NAME, INPUT_USER_PASSWORD, INPUT_USER_EMAIL, INPUT_VERIFICATION_CODE, INPUT_CLEAN_DATA,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS, GET_USERDATA_FAILURE,
  CHANGE_USERDATA_REQUEST, CHANGE_USERDATA_SUCCESS, CHANGE_USERDATA_FAILURE,
  REFRESH_USERDATA_REQUEST, REFRESH_USERDATA_SUCCESS, REFRESH_USERDATA_FAILURE,
  HEADER_TITLE,
} from '../types';
import { checkResponse } from '../../utils/constants';
import {BASEURL} from '../../utils/constants';

// AC регистрации пользователя
export function userRegistration(data, history) {
  const { userName, userEmail, userPassword } = data;
  return function (dispatch) {
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
      catch (error) {
        let err = await error;
        console.log(err);
        dispatch({
          type: REGISTER_FAILURE,
          error: err.message,
        });
      }
    })();
  }
};
// AC восстановление пароля
export function remindPassword(email, history) {
  return function (dispatch) {
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
            // history.replace({ pathname: "/reset-password" });
          })
      }
      catch (error) {
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
export const verifity = (evt) => {
  return {
    type: INPUT_VERIFICATION_CODE,
    verificationCode: evt.target.value,
  }
};

//AC изменения пароля
export function changePassword(newUserPassword, verificationCode, history) {
  return function (dispatch) {
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
      catch (error) {
        let err = await error;
        dispatch({
          type: RESET_PASSWORD_FAILURE,
          error: err.message,
        });
      }
    })();
  }
};