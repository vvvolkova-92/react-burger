import { combineReducers } from 'redux';
import { ingredientsReducer} from './ingredientsReducer.js.js';
import { constructorIngredientsReducer } from './constructorIngredientsReducer.js';
import { orderReducer } from './orderReducer';

//тут должен быть rootReducer
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  orderReducer,
  
});