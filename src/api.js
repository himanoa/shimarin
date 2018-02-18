// @flow
import axios from "axios";
import type { Tweet } from "./actions/tweet";

export const fetchShimarin = async (): Promise<Array<Tweet>> => {
  const response = await axios.get(
    "https://us-central1-shimar-in.cloudfunctions.net/shimarin"
  );
  if (response.status !== 200) {
    throw new Error(response.data.payload);
  }
  const tweets: Array<Tweet> = response.data.payload.tweets;
  return tweets;
};

