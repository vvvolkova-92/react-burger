import styles from './ModalOverlay.module.css';

function ModalOverlay ({closeBtn }: any) {
  return (<div className={styles.modalOverlay} onClick={closeBtn}></div>);
}

export default ModalOverlay 