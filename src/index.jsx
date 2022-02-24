import {render} from 'react-dom';
import './index.css';
import App from './components/App/App'
import { compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import {rootReducer} from './services/reducers/index'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;  

  const enhancer = composeEnhancers(applyMiddleware(thunk));
  const store = createStore(rootReducer, enhancer); 

  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  )

render(app, document.getElementById('root')
);
