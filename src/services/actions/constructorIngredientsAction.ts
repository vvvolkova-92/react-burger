import { IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_MAIN, IN_CONSTRUCTOR_DELETE_INGREDIENT, IN_CONSTRUCTOR_MOVE_INGREDIENT } from '../types';
import { nanoid } from 'nanoid';
import update from 'immutability-helper';
import { IIngredient } from '../types/interfaces';
import TActions from '../types/actions';

export function addIngredientCard (item: IIngredient, main: IIngredient[]): TActions {
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

export function deleteIngredientCard (main: IIngredient[], id: string) {
  return {
    type: IN_CONSTRUCTOR_DELETE_INGREDIENT,
    main: main.filter( item => item.id !== id)
  }
}

export const moveCard = (ingredient: IIngredient, index: number, overIndex: number, main: IIngredient[]) => ({
  type: IN_CONSTRUCTOR_MOVE_INGREDIENT,
  main: update(main, {
    $splice: [
      [index, 1],
      [overIndex, 0, ingredient],
    ],
  }),
});