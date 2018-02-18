// @flow
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../reducers";

const sagaMiddlewares = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddlewares));

export default store;
