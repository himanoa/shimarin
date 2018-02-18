// @flow
export const SYNC_TWEET = 'tweet/sync_tweet'

export type Tweet = {|
  created_at: string,
  entities: {|
    media: Array<{|
      display_url: string,
      expanded_url: string,
      id_str: string,
      indices: Array<number>,
      media_url: string,
      media_url_https: string,
      source_status_id_str: string,
      source_user_id_str: string,
      type: string,
      url: string
    |}>,
    user_mentions: ?Array<{|
      id_str: string,
      indices: Array<number>,
      name: string,
      screen_name: string
    |}>
  |},
  extended_entities: {|
    media: Array<{|
      display_url: string,
      expanded_url: string,
      id_str: string,
      indices: Array<number>,
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
      source_status_id_str: string,
      source_user_id_str: string,
      type: string,
      url: string,
      video_info: ?{|
        aspect_ratio: Array<number>,
        variants: Array<{|
          bitrate: number,
          content_type: string,
          url: string
        |}>
      |}
    |}>
  |},
  favorite_count: number,
  favorited: boolean,
  id_str: string,
  is_quote_status: boolean,
  lang: string,
  metadata: {|
    iso_language_code: string,
    result_type: string
  |},
  possibly_sensitive: boolean,
  retweet_count: number,
  retweeted: boolean,
  retweeted_status: ?{|
    created_at: string,
    entities: {|
      hashtags: ?Array<{|
        indices: Array<number>,
        text: string
      |}>,
      media: ?Array<{|
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
      |}>
    |},
    extended_entities: ?{|
      media: Array<{|
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
        url: string,
        video_info: {|
          aspect_ratio: Array<number>,
          variants: Array<{|
            bitrate: number,
            content_type: string,
            url: string
          |}>
        |}
      |}>
    |},
    favorite_count: number,
    favorited: boolean,
    id_str: string,
    is_quote_status: boolean,
    lang: string,
    metadata: {|
      iso_language_code: string,
      result_type: string
    |},
    possibly_sensitive: boolean,
    retweet_count: number,
    retweeted: boolean,
    source: string,
    text: string,
    truncated: boolean,
    user: {|
      contributors_enabled: boolean,
      created_at: string,
      default_profile: boolean,
      default_profile_image: boolean,
      description: string,
      entities: {|
        description: {|
          urls: Array<{|
            display_url: string,
            expanded_url: string,
            indices: Array<number>,
            url: string
          |}>
        |},
        url: {|
          urls: Array<{|
            display_url: string,
            expanded_url: string,
            indices: Array<number>,
            url: string
          |}>
        |}
      |},
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
      profile_background_image_url: string,
      profile_background_image_url_https: string,
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
      url: string,
      utc_offset: number,
      verified: boolean
    |}
  |},
  source: string,
  text: string,
  truncated: boolean,
  user: {|
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
  |}
|};

export const syncTweet = (tweets:Array<Tweet>) => (
  {
    type: SYNC_TWEET,
    payload: {
      tweets
    }
  }
)
