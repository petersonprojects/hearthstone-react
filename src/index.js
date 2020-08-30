import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cards from './components/Cards';
import Heroes from './components/Heroes';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import BaseLayout from './components/layout/BaseLayout';

let saveToLocalStore = (state) => {

  try{
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState)
  }
  catch(e){
    console.log(e)
  }

}

let loadFromLocalStore = () => {

  const serializeState = localStorage.getItem('state');

  if(serializeState == null)
  {
    return undefined;
  }
  else{
    return JSON.parse(serializeState);
  }

}

const persistedState = loadFromLocalStore();

let store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// this happens every time theres an update to the local store
store.subscribe(()=>{

  saveToLocalStore(store.getState())

})

ReactDOM.render(

  <Provider store={store}>
    <Router>
      <BaseLayout>
        <Switch>

          <Route exact path='/' component={App}/>
          <Route path='/cards' component={Cards}/>
          <Route path='/heroes' component={Heroes}/>

          <Route component={App}/>

        </Switch>
      </BaseLayout>
    </Router>
  </Provider>,
  document.getElementById('root')

);
