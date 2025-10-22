export enum SortOrder {
  DEFAULT = "default",
  ALPHABET = "alphabet",
  REVERSE_ALPHABET = "reverse-alphabet",
}

export enum FetchStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  items: Post[];
  favorites: Post[];
  status: FetchStatus;
  page: number;
  filter: string;
  sort: SortOrder;
  noResults: boolean;
}
