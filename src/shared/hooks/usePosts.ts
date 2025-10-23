import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from ".";
import {
  setSort,
  addPost,
  toggleFavorite,
  setFilter,
} from "../../features/posts/model/postSlice";
import { Post } from "../../features/posts/model/postTypes";
import { SortOrder } from "../../shared/config/constants";

export function usePosts() {
  const dispatch = useAppDispatch();
  const { items, favorites, status, filter, sort, noResults } = useAppSelector(
    (state) => state.posts
  );

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sort === SortOrder.ALPHABET) return a.title.localeCompare(b.title);
      if (sort === SortOrder.REVERSE_ALPHABET)
        return b.title.localeCompare(a.title);
      return 0;
    });
  }, [items, sort]);

  const handleAddPost = (title: string, body: string): void => {
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

  const changeSort = (sort: SortOrder) => dispatch(setSort(sort));
  const handleSortClear = () => changeSort(SortOrder.DEFAULT);
  const handleSortToggle = (): void => {
    sort === SortOrder.DEFAULT
      ? changeSort(SortOrder.ALPHABET)
      : changeSort(
          sort === SortOrder.ALPHABET
            ? SortOrder.REVERSE_ALPHABET
            : SortOrder.ALPHABET
        );
  };

  const toggleFav = (post: Post) => dispatch(toggleFavorite(post));
  const changeFilter = (filter: string) => dispatch(setFilter(filter));

  return {
    items: sortedItems,
    favorites,
    sort,
    filter,
    status,
    noResults,
    title,
    setTitle,
    body,
    setBody,
    selectedPost,
    setSelectedPost,
    showModal,
    setShowModal,
    showPostModal,
    setShowPostModal,
    handleAddPost,
    toggleFav,
    changeSort,
    changeFilter,
    handleSortToggle,
    handleSortClear,
  };
}
