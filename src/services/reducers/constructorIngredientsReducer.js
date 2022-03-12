import {IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_MAIN, IN_CONSTRUCTOR_DELETE_INGREDIENT, IN_CONSTRUCTOR_MOVE_INGREDIENT, IN_CONSTRUCTOR_CLEAN} from '../types';


export const initialState = {
  //список всех ингредиентов в текущем конструкторе бургера
  bun: '',
  main: [],
}

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case IN_CONSTRUCTOR_DELETE_INGREDIENT:
      return { 
        ...state,
        main: action.main,
      }  
      
      case IN_CONSTRUCTOR_MOVE_INGREDIENT:
        return { 
          ...state,
          main: action.main,
        } 
        case IN_CONSTRUCTOR_CLEAN:
          return { 
            ...state,
            main: action.main,
            bun: action.bun,
          } 
    default: return state
  }
}



