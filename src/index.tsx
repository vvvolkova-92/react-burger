import {render} from 'react-dom';
import './index.css';
import App from './components/App/App';
import {Provider} from 'react-redux';
import {store} from './services/store';
import {BrowserRouter} from "react-router-dom";

//точка входа 
  const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )

render(app, document.getElementById('root')
);
