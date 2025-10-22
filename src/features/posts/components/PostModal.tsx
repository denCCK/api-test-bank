import { Modal, Button } from "react-bootstrap";
import { Post } from "../postTypes";

interface Props {
  post: Post | null;
  show: boolean;
  onClose: () => void;
  onRemove: (post: Post) => void;
}

export default function PostModal({ post, show, onClose, onRemove }: Props) {
  if (!post) return null;
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="post-title uppercase">{post.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{post.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => onRemove(post)}>
          <i className="bi bi-trash me-2"></i>Удалить из избранного
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
