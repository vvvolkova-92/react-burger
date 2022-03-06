import {IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_MAIN, IN_CONSTRUCTOR_TOTAL, IN_CONSTRUCTOR_MOVE_INGREDIENT} from '../types';
import { nanoid } from 'nanoid';

export function getIngredientsInConstructor (ingredients) {
  //вариант 1: отделить булки от остальных ингредиентов
  //количество х2
  const ing = Array.of(ingredients);
  return function (dispatch) {
    const bun = ing.find(ingredient => (ingredient.type === "bun" ? ingredient : 0));
    let total = 0;
    // if (bun) bun.counter = 2;
    dispatch({
      type: IN_CONSTRUCTOR_BUNS,
      bun: bun,
    });
    dispatch({
      type: IN_CONSTRUCTOR_MAIN,
      main: ing.filter(ingredient => (ingredient.type !== "bun")),
    });
    dispatch({
      type: IN_CONSTRUCTOR_TOTAL,
      total: ing.map(ingredient => (total += ingredient.price)),
    });
}
}

//addIngredientCard написать!!!

export function addIngredientCard (item, bun, main) {
  let newMain = [...main];
  let newIngredient = {};
  if (item.item)
    return function (dispatch) {
      if (item.item.type === "bun" && item.item !== bun) {
        // bun.counter = 0;
        // item.item.counter = 2;
        dispatch({
          type: IN_CONSTRUCTOR_BUNS,
          bun: item.item,
        });
      }
      if (item.item.type === "bun" && item.item === bun) {
        dispatch({
          type: IN_CONSTRUCTOR_BUNS,
          bun: bun
        });
      }
      if (item.item.type !== "bun" && !main.includes(item.item)) {
        newMain.push(item.item);
      }
      if (item.item.type !== "bun" && main.includes(item.item)) {
        Object.assign(newIngredient, item.item);
        newIngredient.key = nanoid(10);
        newMain.push(newIngredient);
      }
      dispatch({
        type: IN_CONSTRUCTOR_MAIN,
        main: newMain,
      });
    };
  }

  export function moveIngredient(dragIndex, hoverIndex, main) {
    const newMain = [...main];
    const dragMain = newMain[dragIndex];
    newMain.splice(dragIndex, 1);
    newMain.splice(hoverIndex, 0, dragMain);
    return function (dispatch) {
      dispatch({
        type: IN_CONSTRUCTOR_MOVE_INGREDIENT,
        main: newMain,
      });
    };
  }

  export function deleteIngredient(main, id) {
    let result = [];
    const filtered = main.filter(item => item._id !== id);
    main.length === 1
      ? (result = main)
      : (result = filtered);
    return function (dispatch) {
      dispatch({
        type: IN_CONSTRUCTOR_MOVE_INGREDIENT,
        main: result,
      });
    };
  }

