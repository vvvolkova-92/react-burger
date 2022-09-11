import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useState, useRef, useEffect} from "react";
import styles from './404.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return ( 
    <div className={styles.container}></div>
  )
}

export default Error404
