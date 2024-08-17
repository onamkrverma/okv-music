export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  defaultLanguage: string;
}

export interface Thumbnails {
  medium: ImageAttributes;
  standard: ImageAttributes;
  maxres?: ImageAttributes;
  high: ImageAttributes;
}

export interface ImageAttributes {
  url: string;
  width: number;
  height: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface PlaylistItems {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item[];
}
