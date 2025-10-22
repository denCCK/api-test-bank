import { ListGroup } from "react-bootstrap";
import PostItem from "./PostItem";
import { Post } from "../postTypes";

interface Props {
  posts: Post[];
  favorites: Post[];
  onToggleFavorite: (post: Post) => void;
}

export default function PostList({ posts, favorites, onToggleFavorite }: Props) {
  return (
    <ListGroup className="post-list">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          isFavorite={!!favorites.find((f) => f.id === post.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ListGroup>
  );
}
