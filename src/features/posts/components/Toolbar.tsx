import { Button, Form } from "react-bootstrap";
import { Post, SortOrder } from "../postTypes";
import FavoriteDropdown from "./FavoriteDropdown";

export default function Toolbar({
  filter,
  sort,
  favorites,
  onFilterChange,
  onSortToggle,
  onSortClear,
  onAddPost,
  onFavoriteSelect,
}: {
  filter: string;
  sort: string;
  favorites: any[];
  onFilterChange: (value: string) => void;
  onSortToggle: () => void;
  onSortClear: () => void;
  onAddPost: () => void;
  onFavoriteSelect: (post: Post) => void;
}) {

  return (
    <div className="toolbar border d-flex justify-content-between align-items-center gap-2">
      <div className="d-flex gap-2 align-items-center">
        <Button
          variant="outline"
          className="p-0 border-0"
          title="Добавить пост"
          onClick={onAddPost}
        >
          <i className="bi bi-plus-lg icon-lg"></i>
        </Button>
        <Form.Control
          type="text"
          placeholder="Поиск по заголовку"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        />
        <Button
          variant="outline"
          className="p-0 border-0"
          title={`Сортировать по ${
            sort !== SortOrder.REVERSE_ALPHABET ? "алфавиту" : "обратному алфавиту"
          }`}
          onClick={onSortToggle}
        >
          <i className={`bi bi-sort-alpha-down${sort === SortOrder.REVERSE_ALPHABET ? "-alt" : ""} icon-lg`}></i>
        </Button>
        {sort !== "default" && (
          <Button
            variant="outline"
            className="p-0 border-0"
            title="Убрать сортировку"
            onClick={onSortClear}
          >
            <i className="bi bi-x icon-lg"></i>
          </Button>
        )}
      </div>
      <FavoriteDropdown favorites={favorites} onSelect={onFavoriteSelect} />
    </div>
  );
}
