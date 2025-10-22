import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setSort,
  addPost,
  toggleFavorite,
  setFilter,
} from "../../features/posts/postSlice";
import { Post } from "../../features/posts/postTypes";

export function usePosts() {
  const dispatch = useAppDispatch();
  const { items, favorites, sort, filter } = useAppSelector(
    (state) => state.posts
  );

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sort === "alphabet") return a.title.localeCompare(b.title);
      if (sort === "reverse-alphabet") return b.title.localeCompare(a.title);
      return 0;
    });
  }, [items, sort]);

  const addNewPost = (title: string, body: string) => {
    if (!title.trim() || !body.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      title,
      body,
    };
    dispatch(addPost(newPost));

    const fileData = JSON.stringify(newPost, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `post-${newPost.id}.json`;
    link.click();
  };
  const toggleFav = (post: Post) => dispatch(toggleFavorite(post));
  const changeSort = (value: "default" | "alphabet" | "reverse-alphabet") =>
    dispatch(setSort(value));
  const changeFilter = (value: string) => dispatch(setFilter(value));

  return {
    items: sortedItems,
    favorites,
    sort,
    filter,
    addNewPost,
    toggleFav,
    changeSort,
    changeFilter,
  };
}
