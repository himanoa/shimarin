// @flow

import { call, put, takeLatest, delay } from "redux-saga/effects";
import type { IOEffect } from "redux-saga/effects";
import {
  POLL_START,
  TWEETS_FETCH_SUCCESS,
  TWEETS_FETCH_FAILED,
  Action
} from "../actions/tweet";
import Api from "../api";

const minutes: number = 60000;

function* fetchShimarin(): IOEffect {
  while (true) {
    try {
      const tweets = yield call(Api.fetchShimarin);
      yield put({ type: TWEETS_FETCH_SUCCESS, payload: { tweets } });
    } catch (error) {
      yield put({ type: TWEETS_FETCH_FAILED, payload: { error } });
    } finally {
      yield call(delay, 15 * minutes);
    }
  }
}

function* fetchShimarinSaga(): IOEffect {
  yield takeLatest(POLL_START, fetchShimarin);
}

export default fetchShimarinSaga;
