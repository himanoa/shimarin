// @flow

import React from "react";

type Props = {
  text: string,
  link: string
};

const Tweet = ({ text, link }: Props) => (
  <li>
    <a href={link}>{text}</a>
  </li>
);

export default Tweet;
