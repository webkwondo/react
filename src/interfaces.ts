/* eslint-disable @typescript-eslint/no-unused-vars */

interface SearchApiResponse {
  results: Item[];
  total: number;
  total_pages: number;
}

interface Item {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description?: string | null;
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
  last_name?: string | null;
  twitter_username: string | null;
  portfolio_url?: string | null;
  bio?: string | null;
  location?: string | null;
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
  portfolio_url?: string | null;
  twitter_username: string | null;
  paypal_email: string | null;
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

interface AccountFormData {
  fieldFullName: string;
  fieldDob: string;
  fieldCountry: string;
  fieldCheckPolicy: boolean;
  fieldCheckNotifications: boolean;
  fieldContact: string;
  fieldImage: FileList;
}
