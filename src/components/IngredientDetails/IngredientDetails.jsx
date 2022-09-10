import styles from './IngredientDetails.module.css';
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {getIngredients} from "../../services/actions/ingredientsAction";
import {getCookie} from "../../utils/constants";
import {refreshToken} from "../../services/actions/authenticationAction";

function IngredientDetails () {
  const { id } = useParams();
  const location = useLocation();
  const title = 'Детали ингредиента';
  const {ingredients, ingredientsReady} = useSelector(store => store.ingredients);
  const ingredient = useMemo(() => {
    return ingredients.find(ingredient => ingredient._id === id);
  }, [ingredients]);
  return (
    <div className={styles.container}>
      { location.state === undefined && (<h1 className={styles.title + " text text_type_main-large"}>{title}</h1>)}
      { ingredientsReady ? ( <>
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