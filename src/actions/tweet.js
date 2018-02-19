// @flow
export const SYNC_TWEET = "tweet/sync_tweet";
export const POLL_START = "tweet/poll_start";
export const TWEETS_FETCH_SUCCESS = "tweet/fetch_success";
export const TWEETS_FETCH_FAILED = "tweet/fetch_fail";

export type Media = {|
  display_url: string,
  expanded_url: string,
  id_str: string,
  indices: Array<number>,
  media_url: string,
  media_url_https: string,
  sizes: {|
    large: {|
      h: number,
      resize: string,
      w: number
    |},
    medium: {|
      h: number,
      resize: string,
      w: number
    |},
    small: {|
      h: number,
      resize: string,
      w: number
    |},
    thumb: {|
      h: number,
      resize: string,
      w: number
    |}
  |},
  type: string,
  url: string
|};
export type Hashtag = {|
  indices: Array<number>,
  text: string
|};

export type Entities = {|
  hashtags: ?Array<Hashtag>,
  media: ?Array<Media>
|};

export type ExtendedEntities = ?Array<Entities>;

export type MetaData = {|
  iso_language_code: string,
  result_type: string
|};
export type RetweetedStatus = {|
  created_at: string,
  entities: Entities,
  extended_entities: ?ExtendedEntities,
  favorite_count: number,
  favorited: boolean,
  id_str: string,
  is_quote_status: boolean,
  lang: string,
  metadata: MetaData,
  possibly_sensitive: boolean,
  retweet_count: number,
  retweeted: boolean,
  source: string,
  text: string,
  truncated: boolean,
  user: User
|};

export type User = {|
  contributors_enabled: boolean,
  created_at: string,
  default_profile: boolean,
  default_profile_image: boolean,
  description: string,
  favourites_count: number,
  follow_request_sent: boolean,
  followers_count: number,
  following: boolean,
  friends_count: number,
  geo_enabled: boolean,
  has_extended_profile: boolean,
  id_str: string,
  is_translation_enabled: boolean,
  is_translator: boolean,
  lang: string,
  listed_count: number,
  location: string,
  name: string,
  notifications: boolean,
  profile_background_color: string,
  profile_background_tile: boolean,
  profile_banner_url: string,
  profile_image_url: string,
  profile_image_url_https: string,
  profile_link_color: string,
  profile_sidebar_border_color: string,
  profile_sidebar_fill_color: string,
  profile_text_color: string,
  profile_use_background_image: boolean,
  protected: boolean,
  screen_name: string,
  statuses_count: number,
  time_zone: string,
  translator_type: string,
  utc_offset: number,
  verified: boolean
|};
export type Tweet = {|
  created_at: string,
  entities: Entities,
  extended_entities: ?ExtendedEntities,
  favorite_count: number,
  favorited: boolean,
  id_str: string,
  is_quote_status: boolean,
  lang: string,
  metadata: MetaData,
  possibly_sensitive: boolean,
  retweet_count: number,
  retweeted: boolean,
  retweeted_status: ?RetweetedStatus,
  source: string,
  text: string,
  truncated: boolean,
  user: User
|};

export type Action = {|
  type: string,
  payload: {|
    tweets: Array<Tweet>
  |}
|};

export const syncTweet = (tweets: Array<Tweet>) => ({
  type: SYNC_TWEET,
  payload: {
    tweets
  }
});
