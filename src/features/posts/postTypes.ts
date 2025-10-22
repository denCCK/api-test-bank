export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  items: Post[];
  favorites: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  page: number;
  filter: string;
  sort: "default" | "alphabet" | "reverse-alphabet";
  noResults: boolean;
}
