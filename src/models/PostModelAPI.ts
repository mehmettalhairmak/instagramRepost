export interface Candidate {
  width: number;
  height: number;
  url: string;
}

export interface ImageVersions2 {
  candidates: Candidate[];
}

export interface CarouselMedia {
  id: string;
  pk: number;
  media_type: number;
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  video_versions?: VideoVersions[];
}

export interface VideoVersions {
  width: number;
  height: number;
  url: string;
}

export interface User {
  pk: number;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  profile_pic_id: string;
  is_verified: boolean;
  account_type: number;
  is_business: boolean;
}

export interface Location {
  pk: number;
  short_name: string;
  name: string;
  address: string;
  city: string;
  lng: number;
  lat: number;
}

export interface InstagramPostModelAPI {
  status?: string;
  error?: string;
  data?: null;
  id: string;
  pk: number;
  code: string;
  media_type: number;
  taken_at: number;
  image_versions2: ImageVersions2;
  carousel_media?: CarouselMedia[];
  carousel_media_count?: number;
  original_width: number;
  original_height: number;
  video_versions?: VideoVersions[];
  caption?: any;
  user: User;
  product_type: string;
  location?: Location;
  comment_count: number;
  like_count: number;
}
