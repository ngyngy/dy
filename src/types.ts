export interface MovieResource {
  id: string;
  title: string;
  subtitle?: string;
  category: '电影' | '欧美剧集' | '热门动漫' | '经典高分' | '儿童少儿' | '热门短剧';
  quality: string;
  size?: string;
  year: string;
  rating: number;
  tags: string[];
  posterUrl: string;
  bannerBg: string;
  quarkLink: string;
  quarkShareText: string;
  description: string;
  episodes?: string;
  audioSubtitle?: string;
  featured?: boolean;
  hotScore: number;
  addedAt: string;
  customSubmitted?: boolean;
}

export type CategoryFilter = '全部' | '热门短剧' | '欧美剧集' | '电影' | '热门动漫' | '经典高分' | '儿童少儿' | '我的收藏';

export type QualityFilter = '全部' | '4K REMUX' | '4K Dolby Vision' | '4K HDR' | '1080P REMUX' | '大容量合集';

export type SortOption = 'default' | 'rating' | 'hot' | 'sizeDesc' | 'newest';

export type ViewMode = 'grid' | 'list';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}
