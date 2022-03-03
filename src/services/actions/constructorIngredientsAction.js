import {IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_MAIN, IN_CONSTRUCTOR_TOTAL} from '../types';

export function getIngredientsInConstructor (ingredients) {
  //вариант 1: отделить булки от остальных ингредиентов
  //количество х2
  console.log(ingredients);
  return function (dispatch) {
    const bun = ingredients.find(ingredient => (ingredient.type === "bun" ? ingredient : 0));
    const main = ingredients.filter(ingredient => (ingredient.type !== "bun"));
    let total = 0;
    bun.counter = 2;
    dispatch({
      type: IN_CONSTRUCTOR_BUNS,
      bun: bun,
    });
    dispatch({
      type: IN_CONSTRUCTOR_MAIN,
      bun: main,
    });
    dispatch({
      type: IN_CONSTRUCTOR_TOTAL,
      total: ingredients.map(ingredient => (total += ingredient.price)),
    });
}
}

//addIngredientCard написать!!!
