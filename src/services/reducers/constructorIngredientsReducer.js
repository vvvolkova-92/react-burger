import {IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_MAIN, IN_CONSTRUCTOR_TOTAL} from '../types';


export const initialState = {
  //список всех ингредиентов в текущем конструкторе бургера
  bun: [],
  main: [],
}

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    //временный вариант !!!!
    case IN_CONSTRUCTOR_BUNS:
      return { 
        ...state,
        bun: action.bun,
      }
    case IN_CONSTRUCTOR_MAIN:
      return { 
        ...state,
        main: action.main,
      }   
    case IN_CONSTRUCTOR_TOTAL:
      return { 
        ...state,
        main: action.total,
      }   
    default: return state
  }
}



