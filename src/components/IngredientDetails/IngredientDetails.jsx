import styles from './IngredientDetails.module.css';
import {propTypesForIngridients} from '../../utils/constants';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function IngredientDetails () {
  const { id } = useParams();
  // const { currentIngredient } = useSelector((store => store.currentIngredient));
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const ingredient = ingredients.find(ingredient => ingredient._id === id);
  const modal = useSelector(store => store.modalReducer.ingredientCardModal);
  console.log(ingredient);
  return (<div className={styles.container}>
    {modal && ( <>
       <span></span>
      <img src = {ingredient.image_large} alt ={ingredient.name} className={styles.image}/>
      <h3 className={styles.subtitle + " text text_type_main-medium mt-4 mb-8"}>{ingredient.name}</h3>
      <ul className={styles.values}>
        <li className={styles.value + " text text_type_main-default text_color_inactive"}>
          <span>Калории,ккал</span>
          {ingredient.calories}
        </li>
        <li className={styles.value + " text text_type_main-default text_color_inactive"}>
          <span>Белки, г</span>
          {ingredient.proteins}
        </li>
        <li className={styles.value + " text text_type_main-default text_color_inactive"}>
          <span>Жиры, г</span>
          {ingredient.fat}
        </li>
        <li className={styles.value + " text text_type_main-default text_color_inactive"}>
          <span>Углеводы, г</span>
          {ingredient.carbohydrates}
        </li>
      </ul>
    </>)
    }
  </div>
  )
}

IngredientDetails.propTypes = {
  ingredient : propTypesForIngridients,
};

export default IngredientDetails 