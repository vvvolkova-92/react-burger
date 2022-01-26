import styles from './ModalOverlay.module.css';

function ModalOverlay () {
  return <div className={styles.setModal} onClick={() => {console.log('тест клика по оверлею')}}></div>;
}

export default ModalOverlay 