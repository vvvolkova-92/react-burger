import { FC } from 'react';
import { TModalClose } from '../../services/types/interfaces';
import styles from './ModalOverlay.module.css';

const ModalOverlay: FC<TModalClose> = ({ onClose }) => {
  return (<div className={styles.modalOverlay} onClick={onClose}></div>);
}

export default ModalOverlay 