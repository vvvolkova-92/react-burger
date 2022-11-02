import styles from './IngredientDetails.module.css';
import {useLocation, useParams} from "react-router-dom";
import { useSelector } from '../../services/types/hooks';
import {FC, useMemo} from "react";

const IngredientDetails: FC = () => {
  const { id } = useParams<{id: string}>();
  const location = useLocation();
  const title = 'Детали ингредиента';
  const {ingredients, ingredientsReady} = useSelector(store => store.ingredients);

  const ingredient = useMemo(() => {
    return ingredients.find(ingredient => ingredient._id === id);
  }, [ingredients]);
  return (
    <div className={styles.container}>
      { location.state === undefined && (<h1 className={styles.title + " text text_type_main-large"}>{title}</h1>)}
      { ingredientsReady && ingredient!== undefined ? ( <>
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
        </>
      )  : ''}
    </div>
  )
};
export default IngredientDetails;