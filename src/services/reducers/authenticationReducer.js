import {
  INPUT_USER_NAME, INPUT_USER_PASSWORD, INPUT_USER_EMAIL, INPUT_VERIFICATION_CODE, INPUT_CLEAN_DATA,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  GET_USERDATA_REQUEST, GET_USERDATA_SUCCESS, GET_USERDATA_FAILURE,
  REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE,
  CHANGE_USERDATA_REQUEST, CHANGE_USERDATA_SUCCESS, CHANGE_USERDATA_FAILURE,
  HEADER_TITLE
} from '../types';
// ****стейты****
// инпуты
export const inputState = {
  userName: "",
  userEmail: "",
  userPassword: "",
  verificationCode: "",
}
//пользователи
export const userState = {
  userData: null,
  hasError: false,
  isLoading: false,
  error: null,
  isLogin: false,
  isLoadingUser: false,
  tokenRefresh: null,
  refresh: false,
  refreshFail: false,
};
//регистрация
export const registrationState = {
  registrationData: null,
  hasError: false,
  isLoading: false,
  error: null,
};
//восстановление пароля
export const passwordResetState = {
  result: '',
  sendLetter: false,
  hasError: false,
  isLoading: false,
  error: null,
};
// ****стейты****

export const inputReducer = (state = inputState, action) => {
  switch (action.type) {
    case INPUT_USER_NAME: {
      return {
        ...state,
        userName: action.userName,
      };
    }
    case INPUT_USER_EMAIL: {
      return {
        ...state,
        userEmail: action.userEmail,
      };
    }
    case INPUT_USER_PASSWORD: {
      return {
        ...state,
        userPassword: action.userPassword,
      };
    }
    case INPUT_VERIFICATION_CODE: {
      return {
        ...state,
        verificationCode: action.verificationCode,
      };
    }
    case INPUT_CLEAN_DATA: {
      return {
        ...state,
        userName: "",
        userEmail: "",
        userPassword: "",
        verificationCode: "",
      };
    }
    default: {
      return state;
    }
  }
};

export const registrationUserReducer = (state = registrationState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        //TODO сделать лоадер во всем проекте
        isLoading: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registrationData: action.data,
        isLoading: false,
        hasError: false,
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
};

export const ForgotPasswordReducer = (state = passwordResetState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        result: action.data,
        sendLetter: true,
        hasError: false,
        isLoading: false,
      };
    }
    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.error,
        sendLetter: false,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        result: action.data,
        hasError: false,
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        result: null,
        hasError: true,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        userData: action.data,
        hasError: false,
        isLogin: true,
        isLoading: false,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.error,
      };
    }
    case GET_USERDATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isLoadingUser: true,
      };
    }

    case GET_USERDATA_SUCCESS: {
      return {
        ...state,
        userData: action.data,
        hasError: false,
        isLogin: true,
        isLoading: false,
        isLoadingUser: false,
      };
    }

    case GET_USERDATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isLoadingUser: false,
        hasError: true,
        error: action.error,
      };
    }

    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        refresh: false,
      };
    }

    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refresh: true,
        tokenRefresh: action.data,
        hasError: false,
      };
    }

    case REFRESH_TOKEN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        refresh: false,
        refreshFail: true,
        hasError: true,
        error: action.error
      };
    }

    case CHANGE_USERDATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CHANGE_USERDATA_SUCCESS: {
      return {
        ...state,
        userData: action.data,
        isLoading: false,
        hasError: false,
      };
    }

    case CHANGE_USERDATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
};


