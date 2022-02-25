import {render} from 'react-dom';
import './index.css';
import App from './components/App/App';
import {Provider} from 'react-redux';
import {store} from './services/store';

//точка входа 
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  )

render(app, document.getElementById('root')
);
