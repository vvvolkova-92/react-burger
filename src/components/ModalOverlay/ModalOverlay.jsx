import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';
function ModalOverlay ({onCloseBtn }) {
  return (<div className={styles.modalOverlay} onClick={onCloseBtn}></div>);
}

ModalOverlay.propTypes = {
  onCloseBtn: PropTypes.func.isRequired,
}

export default ModalOverlay 