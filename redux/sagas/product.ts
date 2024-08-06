import { call, put, takeEvery } from "redux-saga/effects";
import {
  getFilterTag,
  getFilterTagSuccess,
  getRecommendationCar,
  getRecommendationCarSuccess,
  getCarDetail,
  getCarDetailSuccess,
  getListCar,
  getListCarSuccess,
  getRecommendationCarDetail,
  getRecommendationCarDetailSuccess
} from "../slice/product";
import {
  fetchFilterTag,
  fetchRecommendCar,
  fetchCarDetail,
  fetchListCar
} from "@/services/api/productService";
import { CarDetail, FilterTag, ListCar } from "@/types/product";
import { PayloadAction } from "@reduxjs/toolkit";
import { Params } from "@/types/common";

function* getFilterTagSaga() {
  try {
    const result: FilterTag = yield call(fetchFilterTag);
    yield put(getFilterTagSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) { /* ERROR */ }
}

function* getRecommendCarSaga(action: PayloadAction<Params>) {
  try {
    const result: ListCar = yield call(fetchRecommendCar, action.payload);
    yield put(getRecommendationCarSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) { /* ERROR */ }
}

function* getRecommendCarDetailSaga(action: PayloadAction<Params>) {
  try {
    const result: ListCar = yield call(fetchRecommendCar, action.payload);
    yield put(getRecommendationCarDetailSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) { /* ERROR */ }
}

function* getCarDetailSaga(action: PayloadAction<string>) {
  try {
    const result: CarDetail = yield call(fetchCarDetail, action.payload);
    yield put(getCarDetailSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) { /* ERROR */ }
}

function* getListCarSaga(action: PayloadAction<Params>) {
  try {
    const result: ListCar = yield call(fetchListCar, action.payload);
    yield put(getListCarSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) { /* ERROR */ }
}

export default function* productSaga() {
  yield takeEvery(getFilterTag.type, getFilterTagSaga);
  yield takeEvery(getRecommendationCar.type, getRecommendCarSaga);
  yield takeEvery(getCarDetail.type, getCarDetailSaga);
  yield takeEvery(getListCar.type, getListCarSaga);
  yield takeEvery(getRecommendationCarDetail.type, getRecommendCarDetailSaga);
}
