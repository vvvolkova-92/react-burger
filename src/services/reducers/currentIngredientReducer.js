import {SET_CURRENT_INGREDIENT} from '../types';

export const initialState = {
  //объект текущего просматриваемого ингредиента
  name: "",
  image: null,
  image_large: null,
  image_mobile: null,
  calories: null,
  proteins: null,
  fat: null,
  carbohydrates: null,
  _id: "",
  type: null,
  price: null,
}

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return { 
        ...state,
        name: action.name,
        image: action.image,
        image_large: action.image_large,
        image_mobile: action.image_mobile,
        calories: action.calories,
        proteins: action.proteins,
        fat: action.fat,
        carbohydrates: action.carbohydrates,
        _id: action._id,
        type: action.type,
        price: action.price,
      }
    default: return state
  }
}



