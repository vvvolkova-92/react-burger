import { combineReducers } from 'redux';
import { ingredientsReducer} from './ingredientsReducer.js.js';
import { constructorIngredientsReducer } from './constructorIngredientsReducer.js';
import { orderReducer } from './orderReducer';
import { currentIngredientReducer } from './currentIngredientReducer.js';
import { currentOrderReducer } from './orderReducer';
import { modalReducer } from './modalReducer.js';
import {ForgotPasswordReducer, inputReducer, registrationUserReducer, userReducer} from "./authenticationReducer";
import { socketReducer } from './socketReducer.js';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  currentOrderReducer,
  modalReducer,
  orderReducer,
  inputReducer,
  registrationUserReducer,
  ForgotPasswordReducer,
  userReducer,
  socketReducer,
});