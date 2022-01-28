import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';

function IngredientDetails ({data, ingredient} : any) {
  const modalCard = data.find((element:any) => element._id == ingredient.id);
  console.dir(modalCard);
  return (<div className={styles.container}>
    <img src = {modalCard.image_large} alt ={modalCard.name} className={styles.image}/>
    <h3 className={styles.subtitle + " text text_type_main-medium mt-4 mb-8"}>{modalCard.name}</h3>
    <ul className={styles.values}>
      <li className={styles.value + " text text_type_main-default text_color_inactive"}>
        <span>Калории,ккал</span>
        {modalCard.calories}
      </li>
      <li className={styles.value + " text text_type_main-default text_color_inactive"}>
        <span>Белки, г</span>
        {modalCard.proteins}
      </li>
      <li className={styles.value + " text text_type_main-default text_color_inactive"}>
        <span>Жиры, г</span>
        {modalCard.fat}
      </li>
      <li className={styles.value + " text text_type_main-default text_color_inactive"}>
        <span>Углеводы, г</span>
        {modalCard.carbohydrates}
      </li>
    </ul>
  </div>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      calories: PropTypes.number,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
    })
  ),
  ingredient : PropTypes.string,
};

export default IngredientDetails 