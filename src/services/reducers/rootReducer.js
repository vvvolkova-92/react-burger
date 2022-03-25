import { combineReducers } from 'redux';
import { ingredientsReducer} from './ingredientsReducer.js.js';
import { constructorIngredientsReducer } from './constructorIngredientsReducer.js';
import { orderReducer } from './orderReducer';
import { currentIngredientReducer } from './currentIngredientReducer.js';
import { modalReducer } from './modalReducer.js';
import { inputReduser, userRegistrationInfo } from './authentication.js'

//тут должен быть rootReducer
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  modalReducer,
  orderReducer,
  inputData: inputReduser,
  userData: userRegistrationInfo,
});