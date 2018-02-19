// @flow

import { call, put, race, take } from "redux-saga/effects";
import { delay } from "redux-saga";
import type { Saga, Task, Effect } from "redux-saga";
import type { Action, Tweet } from "../actions/tweet";
import {
  POLL_START,
  TWEETS_FETCH_SUCCESS,
  TWEETS_FETCH_FAILED
} from "../actions/tweet";
import { fetchShimarin } from "../api.js";

const minutes: number = 60000;

function* _fetchShimarin(): * {
  while (true) {
    try {
      const tweets = yield call(fetchShimarin);
      yield put({ type: TWEETS_FETCH_SUCCESS, payload: { tweets } });
    } catch (error) {
      yield put({ type: TWEETS_FETCH_FAILED, payload: { error } });
    } finally {
      yield delay(3 * minutes);
    }
  }
}

function* fetchShimarinSaga(): Saga<void> {
  yield take(POLL_START);
  while (true) {
    yield race([call(_fetchShimarin)]);
  }
}

export default fetchShimarinSaga;
