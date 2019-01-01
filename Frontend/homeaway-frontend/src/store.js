import {createStore, applyMiddleware, compose} from 'redux';
import {browserHistory} from 'react-router';
import thunk from 'redux-thunk';

//Import root reducer
import rootReducer from './reducers/index';
import promise from "redux-promise";

const initialState={}

const middleware = [thunk];

//middleware settings
// To resolve promise to store we use apply
//const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
)
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(rootReducer, initialState,enhancers);

if(module.hot) {
    module.hot.accept('./reducers/',() => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
} 
  

export default store;

