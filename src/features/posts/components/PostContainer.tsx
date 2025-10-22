import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostList from "./PostList";
import AddPostModal from "./AddPostModal";
import PostModal from "./PostModal";
import ScrollToTopButton from "./ScrollToTopButton";
import { Post } from "../postTypes";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchPosts } from "../postThunks";
import Loader from "./Loader";
import Toolbar from "./Toolbar";
import { useInfiniteScroll } from "../../../app/hooks/useInfiniteScroll";
import { usePosts } from "../../../app/hooks/usePosts";

export default function PostContainer() {
  const dispatch = useAppDispatch();
  const { status, page, noResults } = useAppSelector((state) => state.posts);
  const {
    items,
    favorites,
    sort,
    filter,
    addNewPost,
    toggleFav,
    changeSort,
    changeFilter,
  } = usePosts();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { showScrollTop, scrollToTop } = useInfiniteScroll();

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
        onSortToggle={() =>
          sort === "default"
            ? changeSort("alphabet")
            : changeSort(sort === "alphabet" ? "reverse-alphabet" : "alphabet")
        }
        onSortClear={() => changeSort("default")}
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
        onSave={() => addNewPost(title, body)}
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
