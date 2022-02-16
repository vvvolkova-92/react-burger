import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';
import {propTypesForIngridients} from '../../utils/constants';

function IngredientDetails ({ingredient}) {

  return (<div className={styles.container}>
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
  </div>
  )
}

IngredientDetails.propTypes = {
  ingredient : propTypesForIngridients,
};

export default IngredientDetails 