import { INPUT_USER_NAME, INPUT_USER_PASSWORD, INPUT_USER_EMAIL, INPUT_VERIFICATION_CODE, INPUT_CLEAN_DATA, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../types'

export const inputState = {
  userName: "",
  userEmail: "",
  userPassword: "",
  verificationCode: "",
}

export const userRegState = {
  userData: null,
  hasError: false,
  isLoading: false,
}

export const inputReduser = (state = inputState, action) => {
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
        verificationCode: action.data,
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

export const userRegistrationInfo = (state = userRegState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        //TODO сделать лоадер во всем проекте
        isLoading: true,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        userData: action.data,
        isLoading: false,
        hasError: false,
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};