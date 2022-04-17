import {render} from 'react-dom';
import './index.css';
import App from './components/App/App';
import {Provider} from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import {store} from './services/store';

//точка входа 
  const app = (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )

render(app, document.getElementById('root')
);
