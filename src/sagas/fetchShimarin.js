// @flow

import { call, put, race, take } from "redux-saga/effects";
import { delay } from "redux-saga";
import type { IOEffect } from "redux-saga/effects";
import {
  POLL_START,
  TWEETS_FETCH_SUCCESS,
  TWEETS_FETCH_FAILED,
  Action
} from "../actions/tweet";
import { fetchShimarin } from "../api.js";

const minutes: number = 60000;

function* _fetchShimarin(): IOEffect {
  while (true) {
    try {
      console.dir("poe");
      const tweets = yield call(fetchShimarin);
      yield put({ type: TWEETS_FETCH_SUCCESS, payload: { tweets } });
    } catch (error) {
      yield put({ type: TWEETS_FETCH_FAILED, payload: { error } });
    } finally {
      yield delay(15 * minutes);
    }
  }
}

function* fetchShimarinSaga(): IOEffect {
  yield take(POLL_START);
  while (true) {
    yield race([call(_fetchShimarin)]);
  }
}

export default fetchShimarinSaga;
