import {useRef} from 'react';
import { useSelector , useDispatch} from "react-redux";
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {deleteIngredientCard} from '../../services/actions/constructorIngredientsAction'
import {DROP_CARD} from '../../services/types'
import styles from './IngredientInConstructor.module.css'

export function IngredientInConstructor ({id, moveIngredient, findCard, name, image, price }) {

  const dispatch = useDispatch();
  const {main} = useSelector (store => store.constructorIngredients);
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DROP_CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveIngredient(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveIngredient]
  );
  const [, drop3] = useDrop(
    () => ({
      accept: DROP_CARD,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveIngredient(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveIngredient]
  );
  const opacity = isDragging ? 0 : 1;

  return ( <div ref={(node) => drag(drop3(node))} style={{ opacity }}>
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