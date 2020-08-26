import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cards from './components/Cards';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducer from './reducers/reducer';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import BaseLayout from './components/layout/BaseLayout';

// let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(

  // <Provider>
    <Router>
      <BaseLayout>
        <Switch>

          <Route exact path='/' component={App}/>
          <Route path='/cards' component={Cards}/>

          <Route component={App}/>

        </Switch>
      </BaseLayout>
    </Router>,
  // </Provider>
  document.getElementById('root')
);
