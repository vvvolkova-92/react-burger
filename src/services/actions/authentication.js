import { INPUT_USER_NAME, INPUT_USER_PASSWORD, INPUT_USER_EMAIL, INPUT_VERIFICATION_CODE, INPUT_CLEAN_DATA, 
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS, GET_USERDATA_FAILURE,
  CHANGE_USERDATA_REQUEST, CHANGE_USERDATA_SUCCESS, CHANGE_USERDATA_FAILURE,
  REFRESH_USERDATA_REQUEST, REFRESH_USERDATA_SUCCESS, REFRESH_USERDATA_FAILURE,
  HEADER_TITLE,
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

export function changePassword( newUserPassword, verificationCode, history) {
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
//тестово код из практикума
export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
} 

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 

// окончание

export function userLogin(data, history) {
  const { userEmail, userPassword } = data;
  return function (dispatch) {
    (async () => {
      try {
        dispatch({
          type: LOG_IN_REQUEST,
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
          setCookie('accessToken', token);
          document.cookie = `refreshToken=${res.refreshToken}`;
          dispatch({
            type: LOG_IN_SUCCESS,
            data: res,
          });
          dispatch({
            type: INPUT_USER_NAME,
            userName: res.user.name,
          });
          dispatch({
            type: HEADER_TITLE,
            title: res.user.name,
          });
          history.replace({ pathname: "/" });
        })
      } 
      catch (error) {
        let err = await error;
        dispatch({
          type: LOG_IN_FAILURE,
          error: err.message,
        });
      }
    })();
  }
}

export function dontEditProfile(userData) {
  return function (dispatch) {
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
    })
  }
}

export function editProfile(userName, userEmail, userPassword) {
  return function (dispatch) {
    (async () => {
      try {
        dispatch({
          type: CHANGE_USERDATA_REQUEST,
        });
        const res = await fetch(`${BASEURL}/auth/user`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + getCookie('accessToken'),
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
      catch (error) {
        let err = await error;
        dispatch({
          type: CHANGE_USERDATA_FAILURE,
          error: err.message,
        });
      }
    })();
  }
}

export function requestUser() {
  console.log('accessToken');
  console.log(getCookie('accessToken'));
  return function (dispatch) {
    (async () => {
      try {
        dispatch({
          type: GET_USERDATA_REQUEST,
        });
        const res = await fetch(`${BASEURL}/auth/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + getCookie('accessToken'),
          },
        })
        .then( res => {
          if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.json());
        })
        .then( res => {
          if (!res.ok) {
            if (res.message === 'jwt expired') {            
              const token = getCookie('refreshToken');
              dispatch(refreshUser(token,requestUser()));}
          } else 
          dispatch({
            type: GET_USERDATA_SUCCESS,
            data: res,
          });
        })
      } 
      catch (error) {
        let err = await error;
        dispatch({
          type: GET_USERDATA_FAILURE,
          error: err.message,
        });
      }
    })();
  }
}

export function refreshUser(token, requestUser) {
  return function (dispatch) {
    (async () => {
      try {
        dispatch({
          type: REFRESH_USERDATA_REQUEST,
        });
        const res = await fetch(`${BASEURL}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
        })
        .then( res => checkResponse(res))
        .then( res => {
          dispatch({
            type: REFRESH_USERDATA_SUCCESS,
            data: res,
          });
          document.cookie = `accessToken=${res.accessToken.split("Bearer ")[1]}; path=/`;
          document.cookie = `refreshToken=${res.refreshToken}; path=/`;
          if (requestUser) dispatch(requestUser());
        })
      } 
      catch (error) {
        let err = await error;
        dispatch({
          type: REFRESH_USERDATA_FAILURE,
          error: err.message,
        });
      }
    })();
  }
}

//ДОПИСАТЬ ВЫХОД!
export function userLogOut(history) {
  return function (dispatch) {
    (async () => {
      try {
        dispatch({
          type: SIGN_UP_REQUEST,
        });
        const res = await fetch(`${BASEURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // Для выхода из системы или обновления токена используется 
            //именно refreshToken, который можно получить после успешной 
            //регистрации или авторизации.
            token: getCookie('refreshToken'),
        })
        })
        .then( res => checkResponse(res))
        .then( res => {
          let at = getCookie('accessToken');
          let rt = getCookie('refreshToken');
          // Передавайте accessToken в заголовке authorization. 
          //Срок жизни токена — 20 минут.
          document.cookie = `${at}; max-age=1200; path=/;`;
          document.cookie = `${rt}; path=/;`;
          dispatch({
            type: SIGN_UP_SUCCESS,
            data: res,
          });
          dispatch({
            type: INPUT_CLEAN_DATA,
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

export function getUserData () {
  return function (dispatch) {
    dispatch({
      type: GET_USERDATA_REQUEST,
    });
    (async () => {
      try{
      const res = await fetch(`${BASEURL}/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: "Bearer " + getCookie('accessToken'),
      },
      })
        .then( res => checkResponse(res))
        .then( res => {
          dispatch({
            type: GET_USERDATA_SUCCESS,
            data: res,
          });
        })    
  } 
    catch(error) {
      let err = await error;
        dispatch({
          type: GET_USERDATA_FAILURE,
          error: err.message,
        });
      }
    })();
  }
}
