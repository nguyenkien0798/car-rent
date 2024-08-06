import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginUser,
  registerUser,
  verifyEmailUser,
  getMe,
  logoutUser,
} from "@/services/api/authService";
import {
  login,
  loginSuccess,
  register,
  registerSuccess,
  verifyEmail,
  verifyEmailSuccess,
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserError,
  logout,
  logoutSucces,
} from "../slice/auth";
import { Register, Response, Login, User } from "@/types/auth";
import { AxiosResponse } from "axios";

function* registerSaga(action: PayloadAction<Register>) {
  try {
    const result: AxiosResponse = yield call(registerUser, action.payload);
    yield put(registerSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(registerSuccess(error.response));
  }
}

function* loginSaga(action: PayloadAction<Login>) {
  try {
    const result: Response = yield call(loginUser, action.payload);
    yield put(loginSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(loginSuccess(error.response));
  }
}

function* verifyEmailSaga(
  action: PayloadAction<string, string, (error?: AxiosResponse) => void>,
) {
  try {
    const result: Response = yield call(verifyEmailUser, action.payload);
    yield put(verifyEmailSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(verifyEmailSuccess(error.response));
  }
}

function* getCurrentUserSaga() {
  try {
    const result: User = yield call(getMe);
    yield put(getCurrentUserSuccess(result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    yield put(getCurrentUserError(error.response.data.data));
  }
}

function* logoutSaga() {
  try {
    yield call(logoutUser);
    yield put(logoutSucces());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) { 
    yield put(logoutSucces());
  }
}

export default function* authSaga() {
  yield takeLatest(register.type, registerSaga);
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(verifyEmail.type, verifyEmailSaga);
  yield takeLatest(getCurrentUser.type, getCurrentUserSaga);
  yield takeLatest(logout.type, logoutSaga);
}
