import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { incrementPage } from "../../features/posts/postSlice";

export function useInfiniteScroll() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.posts);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 300);
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      status !== "loading"
    ) {
      dispatch(incrementPage());
    }
  }, [dispatch, status]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return { showScrollTop, scrollToTop };
}
