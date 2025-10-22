import { Button, ListGroup } from "react-bootstrap";
import { Post } from "../postTypes";

interface Props {
  post: Post;
  isFavorite: boolean;
  onToggleFavorite: (post: Post) => void;
}

export default function PostItem({ post, isFavorite, onToggleFavorite }: Props) {
  return (
    <ListGroup.Item className="post-item border">
      <div className="post-header">
        <h5 className="post-title uppercase">{post.title}</h5>
        <Button
          variant="outline"
          className="p-0 border-0"
          title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          onClick={() => onToggleFavorite(post)}
        >
          <i
            className={`bi bi-star${isFavorite ? "-fill fill" : ""} icon-star icon-lg`}
          ></i>
        </Button>
      </div>
      <p className="m-0">{post.body}</p>
    </ListGroup.Item>
  );
}
