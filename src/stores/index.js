import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../reducers";
import fetchShimarin from "../sagas/fetchShimarin.js";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(fetchShimarin);

export default store;
