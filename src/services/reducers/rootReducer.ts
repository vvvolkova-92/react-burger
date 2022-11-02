import { combineReducers } from 'redux';
import { ingredientsReducer} from './ingredientsReducer';
import { constructorIngredientsReducer } from './constructorIngredientsReducer';
import { orderReducer } from './orderReducer';
import { currentIngredientReducer } from './currentIngredientReducer';
import { currentOrderReducer } from './orderReducer';
import { modalReducer } from './modalReducer';
import {ForgotPasswordReducer, inputReducer, registrationUserReducer, userReducer} from "./authenticationReducer";
import { socketReducer } from './socketReducer';

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