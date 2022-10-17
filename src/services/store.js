import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware} from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { socketMiddleware } from './socketMiddleware';
import logger from 'redux-logger';
import { wsTypes } from './types';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
  //
  const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsTypes), logger));
  // export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  export const store = createStore(rootReducer, enhancer); 