import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import coinsReducer from './reducers/coins-reducer';

const rootReducer = combineReducers({
  coinsReducer
});

type TRootReducer = typeof rootReducer
export type TAppState = ReturnType<TRootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;