import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div className="loading">
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
    </div>
  );
}
