import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware} from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { socketMiddleware } from './socketMiddleware';
import logger from 'redux-logger';
import { WSURL } from '../utils/constants';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
  //
  const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WSURL), logger));

// const enhancer = composeEnhancers(applyMiddleware(thunk));
  // export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  export const store = createStore(rootReducer, enhancer); 