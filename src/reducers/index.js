
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducer from './reducer'
import auth from './auth';
export default combineReducers({
    auth,
    form: formReducer,
    reducer
});