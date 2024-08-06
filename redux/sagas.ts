import { all } from "redux-saga/effects";
import authSaga from "./sagas/auth";
import productSaga from "./sagas/product";
import paymentSaga from "./sagas/payment"

function* rootSaga() {
  yield all([
    authSaga(),
    productSaga(),
    paymentSaga()
  ]);
}

export default rootSaga;
