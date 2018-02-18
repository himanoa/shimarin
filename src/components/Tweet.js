// @flow

import React from "react";

export type TweetProps = {
  text: string,
  link: string
};

const Tweet = ({ text, link }: TweetProps) => (
  <li>
    <a href={link}>{text}</a>
  </li>
);

export default Tweet;
