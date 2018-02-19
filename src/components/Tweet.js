// @flow

import React from "react";
import type { Tweet as t } from "../actions/tweet";

const statusUrl = (screenName: string, statusId: string): string =>
  `https://twitter.com/${screenName}/status/${statusId}`;

const retweeted_by = (tweet: t): ?string => {
  if (tweet == null) {
    return;
  }
  return `Retweeted by @${tweet.user.screen_name}`;
};

const Tweet = (tweet: any) => {
  if (tweet.retweeted_status === null || tweet.retweeted_status === undefined) {
    tweet.retweeted_status = tweet;
  }
  return (
    <li>
      <div class="column is-two-quarter">
        <a
          target="_blank"
          href={statusUrl(tweet.user.screen_name, tweet.id_str)}
        >
          <div class="card" style={{ display: "inline-block" }}>
            <div class="card-image" style={{ display: "inline-block" }}>
              <figure style={{ display: "inline-block" }}>
                <img
                  src={`${
                    tweet.extended_entities.media[0].media_url_https
                  }:small`}
                  width={tweet.extended_entities.media[0].sizes.small.w + "px"}
                  height={tweet.extended_entities.media[0].sizes.small.h + "px"}
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img
                      src={tweet.retweeted_status.user.profile_image_url_https}
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-3">{tweet.retweeted_status.user.name}</p>
                  <p class="subtitle is-5">
                    @{tweet.retweeted_status.user.screen_name}
                  </p>
                </div>
              </div>
              <div
                class="content"
                style={{
                  display: "inline-block"
                }}
              >
                <p
                  style={{
                    "max-width": `${tweet.extended_entities.media[0].sizes.small
                      .w - 8}px`
                  }}
                >
                  {tweet.retweeted_status.text}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </li>
  );
};

export default Tweet;
