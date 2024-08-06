import { call, put, takeLatest } from "redux-saga/effects";
import {
  getListOrders,
  getListOrdersSuccess,
  getOrdersSummary,
  getOrdersSummarySuccess,
  getOrderSummaryError,
  getOrderDetail,
  getOrderDetailSuccess
} from "../slice/payment";
import { PayloadAction } from "@reduxjs/toolkit";
import { DataListOrders, DataOrderDetail, OrdersSummary } from "@/types/payment";
import { Params, BodyParamsSummary } from "@/types/common";
import { fetchDataOrderSummary, fetchListOrders, fetchOrderDetail } from "@/services/api/payment";

function* getDataOrderSummarySaga(action: PayloadAction<BodyParamsSummary>) {
  try {
    const result: OrdersSummary = yield call(fetchDataOrderSummary, action.payload);
    yield put(getOrdersSummarySuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) { 
    yield put(getOrderSummaryError(error.response.data))
   }
}

function* getListOrdersSaga(action: PayloadAction<Params>) {
  // eslint-disable-next-line no-useless-catch
  try {
    const result: DataListOrders = yield call(fetchListOrders, action.payload);
    yield put(getListOrdersSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) { 
    throw error;
   }
}

function* getOrderDetailsSaga(action: PayloadAction<string>) {
  // eslint-disable-next-line no-useless-catch
  try {
    const result: DataOrderDetail = yield call(fetchOrderDetail, action.payload);
    yield put(getOrderDetailSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error
  }
}

export default function* productSaga() {
  yield takeLatest(getOrdersSummary.type, getDataOrderSummarySaga);
  yield takeLatest(getListOrders.type, getListOrdersSaga);
  yield takeLatest(getOrderDetail.type, getOrderDetailsSaga);
}
