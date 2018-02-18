// @flow

import React from "react";
import type { TweetProps } from "./Tweet";
import Tweet from "./Tweet";

export type TweetListProps = Array<TweetProps>;

const TweetList = (tweets: TweetListProps) => (
  <ul>{tweets.map(t => <Tweet {...t} />)}</ul>
);

export default TweetList;
