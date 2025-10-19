import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  fetchPosts,
  toggleFavorite,
  addPost,
  incrementPage,
  setFilter,
  setSort,
} from "./postSlice";
import {
  Container,
  Button,
  Form,
  ListGroup,
  Spinner,
  Badge,
  Modal,
  Dropdown,
} from "react-bootstrap";

export default function App() {
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

  const handleAddPost = () => {
    if (!title.trim() || !body.trim()) return;
    const newPost = {
      id: Date.now(),
      title,
      body,
    };
    dispatch(addPost(newPost));
    setTitle("");
    setBody("");

    const fileData = JSON.stringify(newPost, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `post-${newPost.id}.json`;
    link.click();
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFavoriteClick = (post: any) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleRemoveFavorite = (post: any) => {
    dispatch(toggleFavorite(post));
    setShowPostModal(false);
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

  const SortIcon = ({ sort }: { sort: string }) => {
    if (sort === "reverse-alphabet")
      return (
        <i
          className="bi bi-sort-alpha-down-alt"
          style={{ fontSize: "24px" }}
        ></i>
      );
    return (
      <i className="bi bi-sort-alpha-down" style={{ fontSize: "24px" }}></i>
    );
  };

  if (status === "failed") return <p>Ошибка загрузки</p>;

  return (
    <Container className="app-container">
      <h1 className="app-title">Список постов</h1>
      <div className="toolbar border">
        <div className="d-flex gap-2 justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <Button
              variant="outline"
              className="p-0 border-0"
              title="Добавить пост"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-lg icon-lg"></i>
            </Button>
            <Form.Control
              type="text"
              placeholder="Поиск по заголовку"
              className="m-0"
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value))}
            />
            <Button
              variant="outline"
              className="p-0 border-0"
              title={`Сортировать по ${
                sort !== "reverse-alphabet"
                  ? "алфавиту"
                  : "обратному алфавитному порядку"
              }`}
              onClick={handleSortToggle}
            >
              <SortIcon sort={sort} />
            </Button>
            {sort !== "default" && (
              <Button
                variant="outline"
                className="p-0 border-0"
                title="Убрать сортировку"
                onClick={() => dispatch(setSort("default"))}
              >
                <i className="bi bi-x icon-lg"></i>
              </Button>
            )}
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="primary">
              <i className="bi bi-star me-1"></i>Избранное{"  "}
              <Badge bg="light" text="dark">
                {favorites.length}
              </Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ maxWidth: "300px" }}>
              {favorites.length === 0 && (
                <Dropdown.Item disabled>Пусто</Dropdown.Item>
              )}
              {favorites.map((post) => (
                <Dropdown.Item
                  key={post.id}
                  onClick={() => handleFavoriteClick(post)}
                >
                  <div className="post-title">{post.title}</div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <ListGroup className="post-list">
        {sortedItems.map((post) => (
          <ListGroup.Item
            key={post.id}
            className="post-item border"
          >
            <div className="post-header">
              <h5 className="post-title uppercase">{post.title}</h5>
              <Button
                variant="outline"
                className="p-0 border-0"
                title={favorites.find((f) => f.id === post.id) ? "Убрать из избранного" : "Добавить в избранное"}
                onClick={() => dispatch(toggleFavorite(post))}
              >
                <i
                  className={`bi bi-star${
                    favorites.find((f) => f.id === post.id) ? "-fill fill" : ""
                  } icon-star icon-lg`}
                ></i>
              </Button>
            </div>
            <p className="m-0">{post.body}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {status === "loading" && (
        <div className="loading">
          <Spinner animation="grow" size="sm" role="status" />
          <Spinner animation="grow" size="sm" role="status" />
          <Spinner animation="grow" size="sm" role="status" />
        </div>
      )}
      {noResults && <p className="text-center text-muted">Ничего не найдено</p>}
      <Button
        variant="secondary"
        onClick={scrollToTop}
        className={`scroll-top ${showScrollTop ? "visible" : ""}`}
      >
        <i className="bi bi-arrow-up"></i>
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Новый пост</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-2">
            <Form.Control
              type="text"
              placeholder="Заголовок нового поста"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Содержимое нового поста"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddPost}>
            <i className="bi bi-check-circle me-2"></i>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPostModal} onHide={() => setShowPostModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="post-title uppercase">
            {selectedPost?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedPost?.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => handleRemoveFavorite(selectedPost)}
          >
            <i className="bi bi-trash me-2"></i>Удалить из избранного
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
