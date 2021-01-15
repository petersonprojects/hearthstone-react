import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cards from './components/Cards';
import Heroes from './components/Heroes';
import Battlegrounds from './components/Battlegrounds';
// import Feature from './components/Feature';
// import Signin from './components/auth/Singin';
// import Signout from './components/auth/Signout';
// import Signup from './components/auth/Signup';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import reduxThunk from 'redux-thunk';
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


let store = createStore(reducer, persistedState, compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

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
          <Route path='/battlegrounds' component={Battlegrounds}/>
          <Route path='/heroes' component={Heroes}/>
          {/* <Route path ='/signup' component = {Signup}/>
          <Route path ='/feature' component = {Feature}/>
          <Route path ='/signout' component = {Signout}/>
          <Route path ='/signin' component = {Signin}/> */}

          <Route component={App}/>

        </Switch>
      </BaseLayout>
    </Router>
  </Provider>,
  document.getElementById('root')

);
