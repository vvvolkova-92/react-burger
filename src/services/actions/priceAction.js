import {TOTAL_PRICE} from '../types';

export function sumPrice(main, bun) {
  let totalMain = 0
  let totalBun = 0
  if (bun.type) {
    totalBun = bun.price * 2;
  }
  if (!bun.type){
    totalBun = 0
  }
  if (main !== undefined) {
   if (main.length > 0) {
    totalMain = main.map(item => item.price).reduce((a, b) => a + b, 0)}
   if (main.length === 0) {
    totalMain = 0
   }
  }
  return function (dispatch) {
    dispatch({
      type: TOTAL_PRICE,
      totalSum: totalBun + totalMain,
    });
  };
}


