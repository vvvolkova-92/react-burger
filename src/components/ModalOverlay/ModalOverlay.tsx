import styles from './ModalOverlay.module.css';

function ModalOverlay ({ close }: any) {
  return <div className={styles.modalOverlay} onClick={close}></div>;
}

export default ModalOverlay 