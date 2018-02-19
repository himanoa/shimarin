// @flow

import React from "react";
import { connect } from "react-redux";

import type { Tweet as t } from "../actions/tweet";
import Tweet from "./Tweet";

type TweetListProps = {
  tweets: Array<t>
};

const mapStateToProps = state => state;
const TweetList = connect(mapStateToProps, () => {})(
  (state: TweetListProps) => (
    <ul class="columns is-multiline">
      {state.tweets.map(tw => <Tweet {...tw} />)}
    </ul>
  )
);

export default TweetList;
