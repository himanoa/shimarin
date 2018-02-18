// @flow
import { SYNC_TWEET } from "../actions/tweet";
import type { Tweet, Action } from "../actions/tweet";

const tweets = (state: Array<Tweet> = [], action: Action) => {
  switch (action.type) {
    case SYNC_TWEET:
      return action.payload.tweets;
    default:
      return state;
  }
};

export default tweets;
