
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';

import appReducer from 'src/store/reducers/appReducer';


const middleware = [thunk];

/* eslint-disable */

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
: compose;

/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

export default createStore(
  combineReducers({
    app: appReducer,
  }),
  enhancer,
);
