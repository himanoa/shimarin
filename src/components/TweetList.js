// @flow

import React from "react";
import { connect } from "react-redux";

import type { TweetProps } from "./Tweet";
import Tweet from "./Tweet";

export type TweetListProps = Array<TweetProps>;

const mapStateToProps = state => state;
const TweetList = connect(mapStateToProps, () => {})(
  (tweets: TweetListProps) => <ul>{tweets.map(t => <Tweet {...t} />)}</ul>
);

export default TweetList;
