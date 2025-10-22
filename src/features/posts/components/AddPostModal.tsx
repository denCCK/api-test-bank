import { Modal, Form, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  title: string;
  body: string;
  onChangeTitle: (v: string) => void;
  onChangeBody: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function AddPostModal({
  show,
  title,
  body,
  onChangeTitle,
  onChangeBody,
  onSave,
  onClose,
}: Props) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Новый пост</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column gap-2">
          <Form.Control
            type="text"
            placeholder="Заголовок нового поста"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
          />
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Содержимое нового поста"
            value={body}
            onChange={(e) => onChangeBody(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSave}>
          <i className="bi bi-check-circle me-2"></i>Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
