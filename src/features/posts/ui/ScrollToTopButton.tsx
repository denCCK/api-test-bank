import { Button } from "react-bootstrap";

interface Props {
  visible: boolean;
  onClick: () => void;
}

export default function ScrollToTopButton({ visible, onClick }: Props) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={`scroll-top ${visible ? "visible" : ""}`}
    >
      <i className="bi bi-arrow-up"></i>
    </Button>
  );
}
