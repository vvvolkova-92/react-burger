import {useRef} from 'react';
import { useSelector , useDispatch} from "react-redux";
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {deleteIngredientCard, moveIngredient} from '../../services/actions/constructorIngredientsAction'
import {DROP_CARD} from '../../services/types'
import styles from './IngredientInConstructor.module.css'

export function IngredientInConstructor ({item, index, id}) {

  const dispatch = useDispatch();
  const {main} = useSelector (store => store.constructorIngredients);

  const ref = useRef(null);
  const [, dropRef] = useDrop({
    accept: DROP_CARD,
    collect: (monitor) => ({
      isOver: !monitor.isOver(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredient(dragIndex, hoverIndex, main));
      item.index = hoverIndex;
    },
  },[dispatch]);

  const [{ isDragging }, drag] = useDrag({
    type: 'DROP_CARD',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(dropRef(ref));

  return (
    <li className={styles.item + " mr-2 mt-4 mb-4 " + styles.flex} key={item._id} ref={ref}>
    <div className=""><DragIcon type="primary" /></div>
    <ConstructorElement
      text={item.name}
      price={item.price}
      thumbnail={item.image_mobile}
      handleClose={() => dispatch(deleteIngredientCard(main, id))} 
    />
  </li>
  )
} 