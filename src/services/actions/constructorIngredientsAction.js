import {IN_CONSTRUCTOR_BUNS, IN_CONSTRUCTOR_MAIN, IN_CONSTRUCTOR_TOTAL} from '../types';
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







  let newCard = {};
  const currentIngredient = item.item;
  if (currentIngredient) return function (dispatch) {
      if (currentIngredient.type === 'bun' && currentIngredient !== bun) {
        bun.counter = 0;
        currentIngredient.counter = 2;
        dispatch({
          type: IN_CONSTRUCTOR_BUNS,
          bun: currentIngredient,
        });
      }
      let newMain = [...main];
      if (currentIngredient.type !== "bun" && !main.includes(currentIngredient)) {

        newCard = {...currentIngredient};
        newCard.key = nanoid(10);
        newMain.push(newCard);
        console.log('не булка и в массиве нет');
      } 
      if (currentIngredient.type !== "bun" && main.includes(currentIngredient)) {
        newMain.push(currentIngredient);
        console.log('не булка и ингредиент уже есть');
      }
      dispatch({
        type: IN_CONSTRUCTOR_MAIN,
        main: newMain,
      });
}
}
