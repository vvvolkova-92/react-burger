import { INPUT_USER_NAME, INPUT_USER_PASSWORD, INPUT_USER_EMAIL, INPUT_VERIFICATION_CODE, INPUT_CLEAN_DATA, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../types';
import { checkResponse } from '../../utils/constants';
import {BASEURL} from '../../utils/constants';

export function userRegistration(data) {
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
          // history.replace({ pathname: "/login" });
        })
      } catch (error) {
        dispatch({
          type: SIGN_UP_FAILURE,
        });
      }
    })();
  }
}