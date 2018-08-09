
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import appReducer from 'src/store/reducers/appReducer'

export const history = createBrowserHistory()
const middleware = [thunk, routerMiddleware(history)]

/* eslint-disable */

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
: compose

/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
)

const rootReducer = combineReducers({
  app: appReducer,
})

export default createStore(
  connectRouter(history)(rootReducer),
  enhancer,
)
