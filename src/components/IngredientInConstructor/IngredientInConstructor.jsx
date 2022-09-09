import { useSelector , useDispatch} from "react-redux";
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {deleteIngredientCard} from '../../services/actions/constructorIngredientsAction'
import {DROP_CARD} from '../../services/types'
import styles from './IngredientInConstructor.module.css'
import PropTypes from 'prop-types';

export function IngredientInConstructor ({id, moveIngredient, findIngredient, name, image, price }) {

  const dispatch = useDispatch();
  const {main} = useSelector (store => store.constructorIngredients);
  const itemIndex = findIngredient(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DROP_CARD,
      item: { id, itemIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, itemIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveIngredient(droppedId, itemIndex);
        }
      },
    }),
    [id]
  );
  const [, dropCard] = useDrop(
    () => ({
      accept: DROP_CARD,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findIngredient(id);
          moveIngredient(draggedId, overIndex);
        }
      },
    }),
    [findIngredient, moveIngredient]
  );
  const opacity = isDragging ? 0 : 1;

  return ( <div ref={(node) => drag(dropCard(node))} style={{ opacity }}>
    <li className={styles.item + " mr-2 mt-4 mb-4 " + styles.flex} key={id} >
    <div className=""><DragIcon type="primary" /></div>
    <ConstructorElement
      text={name}
      price={price}
      thumbnail={image}
      handleClose={() => dispatch(deleteIngredientCard(main, id))} 
    />
  </li>
  </div>
  )
} 

IngredientInConstructor.propTypes = {
  id: PropTypes.string.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  findIngredient: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}