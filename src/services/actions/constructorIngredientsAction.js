import { IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_MAIN, IN_CONSTRUCTOR_DELETE_INGREDIENT, IN_CONSTRUCTOR_MOVE_INGREDIENT } from '../types';
import { nanoid } from 'nanoid';
import update from 'immutability-helper';

//addIngredientCard написать!!!

export function addIngredientCard (item, main) {
  return item.type !== "bun"
    ? {
        type: IN_CONSTRUCTOR_MAIN,
        main: [...main, { ...item, id: nanoid(10) }],
      }
    : {
        type: IN_CONSTRUCTOR_BUNS,
        bun: item,
      };
};
//возможно ошибка тут?!
export function deleteIngredientCard (main, id) {
  return function (dispatch) {
    dispatch({
      type: IN_CONSTRUCTOR_DELETE_INGREDIENT,
      main: main.filter( item => item.id !== id)
    });
  }
}
export const sortIngredient = (card, index, atIndex, main) => ({
  type: IN_CONSTRUCTOR_MOVE_INGREDIENT,
  main: update(main, {
    $splice: [
      [index, 1],
      [atIndex, 0, card],
    ],
  }),
});