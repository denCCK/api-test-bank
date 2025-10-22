import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleFavorite } from "../../features/posts/postSlice";
import { Post } from "../../features/posts/postTypes";

export const useFavoritesSync = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.posts.favorites);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved)
      try {
        const parsed: Post[] = JSON.parse(saved);
        if (parsed.length > 0 && favorites.length === 0)
          parsed.forEach((post) => dispatch(toggleFavorite(post)));
      } catch {
        console.warn("Ошибка при чтении favorites из localStorage");
      }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
};
