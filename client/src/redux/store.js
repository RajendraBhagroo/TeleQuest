import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

/*
 * Integrates React Developer Tools
 * Install React DevTools: https://github.com/facebook/react-devtools
 * Install Redux DevTools: https://github.com/zalmoxisus/redux-devtools-extension
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const middleware = [reduxThunk];

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
