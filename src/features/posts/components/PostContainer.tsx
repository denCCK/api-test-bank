import { useEffect, useCallback, useState } from "react";
import {
  toggleFavorite,
  addPost,
  incrementPage,
  setFilter,
  setSort,
} from "../postSlice";
import { Container, Button, Form, Spinner } from "react-bootstrap";
import PostList from "./PostList";
import AddPostModal from "./AddPostModal";
import PostModal from "./PostModal";
import ScrollToTopButton from "./ScrollToTopButton";
import { Post } from "../postTypes";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchPosts } from "../postThunks";
import Loader from "./Loader";
import Toolbar from "./Toolbar";

export default function PostContainer() {
  const dispatch = useAppDispatch();
  const { items, favorites, status, page, filter, sort, noResults } =
    useAppSelector((state) => state.posts);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts({ page, filter }));
  }, [dispatch, page, filter]);

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

  const handleAddPost = () => {
    if (!title.trim() || !body.trim()) return;
    const newPost = { id: Date.now(), title, body };
    dispatch(addPost(newPost));
    setTitle("");
    setBody("");
  };

  const handleSortToggle = () => {
    if (sort === "default") dispatch(setSort("alphabet"));
    else if (sort === "alphabet") dispatch(setSort("reverse-alphabet"));
    else dispatch(setSort("alphabet"));
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sort === "alphabet") return a.title.localeCompare(b.title);
    if (sort === "reverse-alphabet") return b.title.localeCompare(a.title);
    return 0;
  });

  if (status === "failed") return <p>Ошибка загрузки</p>;

  return (
    <Container className="app-container">
      <h1 className="app-title">Список постов</h1>
      <Toolbar
        filter={filter}
        sort={sort}
        favorites={favorites}
        onFilterChange={(value) => dispatch(setFilter(value))}
        onSortToggle={handleSortToggle}
        onSortClear={() => dispatch(setSort("default"))}
        onAddPost={() => setShowModal(true)}
        onFavoriteSelect={(post) => {
          setSelectedPost(post);
          setShowPostModal(true);
        }}
      />

      <PostList
        posts={sortedItems}
        favorites={favorites}
        onToggleFavorite={(post: Post) => dispatch(toggleFavorite(post))}
      />

      {status === "loading" && <Loader />}

      {noResults && <p className="text-center text-muted">Ничего не найдено</p>}

      <ScrollToTopButton
        visible={showScrollTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      <AddPostModal
        show={showModal}
        title={title}
        body={body}
        onChangeTitle={setTitle}
        onChangeBody={setBody}
        onSave={handleAddPost}
        onClose={() => setShowModal(false)}
      />

      <PostModal
        post={selectedPost}
        show={showPostModal}
        onClose={() => setShowPostModal(false)}
        onRemove={(post) => {
          dispatch(toggleFavorite(post));
          setShowPostModal(false);
        }}
      />
    </Container>
  );
}
