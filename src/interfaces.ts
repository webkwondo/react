/* eslint-disable @typescript-eslint/no-unused-vars */

interface Item {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description?: string;
  alt_description: string;
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  topic_submissions: object;
  user: User;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name?: string;
  twitter_username: string;
  portfolio_url?: string;
  bio?: string;
  location?: string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface Social {
  instagram_username: string;
  portfolio_url?: string;
  twitter_username: string;
  paypal_email: string;
}

interface AccountData {
  id: string;
  name: string | null;
  dob: string | null;
  country: string | null;
  policy: boolean;
  notifications: boolean;
  contact: string | null;
  image: File | null;
}
