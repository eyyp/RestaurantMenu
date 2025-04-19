import { call, takeEvery, takeLatest } from "redux-saga/effects";
import * as types from '../actions/type.js'
import ChecksSaga from "./user/check.js";

export default function* sagas() {
    yield takeLatest(types.USER_CHECK_REQUEST,ChecksSaga);
}