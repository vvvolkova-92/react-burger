import { INPUT_USER_NAME, INPUT_USER_PASSWORD, INPUT_USER_EMAIL, INPUT_VERIFICATION_CODE, INPUT_CLEAN_DATA, 
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE
 } from '../types';
import { checkResponse } from '../../utils/constants';
import {BASEURL} from '../../utils/constants';

export function userRegistration(data, history) {
  const { userName, userEmail, userPassword } = data;
  return function (dispatch) {
    (async () => {
      try {
        dispatch({
          type: SIGN_UP_REQUEST,
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
            type: SIGN_UP_SUCCESS,
            data: res,
          });
          history.replace({ pathname: "/login" });
        })
      } 
      catch (error) {
        let err = await error;
        dispatch({
          type: SIGN_UP_FAILURE,
          error: err.message,
        });
      }
    })();
  }
}

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
          history.replace({ pathname: "/reset-password" });
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
          history.replace({ pathname: "/" });
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
}