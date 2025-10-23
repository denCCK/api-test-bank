import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostList from "../../features/posts/ui/PostList";
import AddPostModal from "../../features/posts/ui/AddPostModal";
import PostModal from "../../features/posts/ui/PostModal";
import ScrollToTopButton from "../../features/posts/ui/ScrollToTopButton";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { fetchPosts } from "../../features/posts/api/postThunks";
import Loader from "../../features/posts/ui/Loader";
import Toolbar from "../../features/posts/ui/Toolbar";
import { useInfiniteScroll } from "../../shared/hooks/useInfiniteScroll";
import { usePosts } from "../../shared/hooks/usePosts";
import { useFavoritesSync } from "../../shared/hooks/useFavoritesSync";
import { FetchStatus } from "../../shared/config/constants";

export default function PostPage() {
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

  if (status === FetchStatus.Failed) return <p>Ошибка загрузки</p>;

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

      {status === FetchStatus.Loading && <Loader />}

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
