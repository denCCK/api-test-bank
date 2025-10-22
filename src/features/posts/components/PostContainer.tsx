import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostList from "./PostList";
import AddPostModal from "./AddPostModal";
import PostModal from "./PostModal";
import ScrollToTopButton from "./ScrollToTopButton";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchPosts } from "../postThunks";
import Loader from "./Loader";
import Toolbar from "./Toolbar";
import { useInfiniteScroll } from "../../../app/hooks/useInfiniteScroll";
import { usePosts } from "../../../app/hooks/usePosts";
import { useFavoritesSync } from "../../../app/hooks/useFavoritesSync";

export default function PostContainer() {
  const dispatch = useAppDispatch();
  const { status, page, noResults } = useAppSelector((state) => state.posts);
  const {
    items,
    favorites,
    sort,
    filter,
    title,
    setTitle,
    body,
    setBody,
    showModal,
    setShowModal,
    showPostModal,
    setShowPostModal,
    selectedPost,
    setSelectedPost,
    handleAddPost,
    toggleFav,
    changeFilter,
    handleSortToggle,
    handleSortClear,
  } = usePosts();

  const { showScrollTop, scrollToTop } = useInfiniteScroll();
  useFavoritesSync();

  useEffect(() => {
    dispatch(fetchPosts({ page, filter }));
  }, [dispatch, page, filter]);

  if (status === "failed") return <p>Ошибка загрузки</p>;

  return (
    <Container className="app-container">
      <h1 className="app-title">Список постов</h1>
      <Toolbar
        filter={filter}
        sort={sort}
        favorites={favorites}
        onFilterChange={changeFilter}
        onSortToggle={handleSortToggle}
        onSortClear={handleSortClear}
        onAddPost={() => setShowModal(true)}
        onFavoriteSelect={(post) => {
          setSelectedPost(post);
          setShowPostModal(true);
        }}
      />

      <PostList
        posts={items}
        favorites={favorites}
        onToggleFavorite={toggleFav}
      />

      {status === "loading" && <Loader />}

      {noResults && <p className="text-center text-muted">Ничего не найдено</p>}

      <ScrollToTopButton visible={showScrollTop} onClick={scrollToTop} />

      <AddPostModal
        show={showModal}
        title={title}
        body={body}
        onChangeTitle={setTitle}
        onChangeBody={setBody}
        onSave={() => handleAddPost(title, body)}
        onClose={() => setShowModal(false)}
      />

      <PostModal
        post={selectedPost}
        show={showPostModal}
        onClose={() => setShowPostModal(false)}
        onRemove={(post) => {
          toggleFav(post);
          setShowPostModal(false);
        }}
      />
    </Container>
  );
}
