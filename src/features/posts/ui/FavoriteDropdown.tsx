import { Dropdown, Badge } from "react-bootstrap";
import { Post } from "../model/postTypes";

interface Props {
  favorites: Post[];
  onSelect: (post: Post) => void;
}

export default function FavoriteDropdown({ favorites, onSelect }: Props) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary">
        <i className="bi bi-star me-1"></i>Избранное{" "}
        <Badge bg="light" text="dark">{favorites.length}</Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ maxWidth: "300px" }}>
        {favorites.length === 0 && (
          <Dropdown.Item disabled>Пусто</Dropdown.Item>
        )}
        {favorites.map((post) => (
          <Dropdown.Item key={post.id} onClick={() => onSelect(post)}>
            <div className="post-title">{post.title}</div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
