import { FetchStatus, SortOrder } from "../../../shared/config/constants";

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
