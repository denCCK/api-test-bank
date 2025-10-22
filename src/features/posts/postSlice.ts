import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsState, Post } from "./postTypes";
import { fetchPosts } from "./postThunks";

const initialState: PostsState = {
  items: [],
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  status: "idle",
  page: 1,
  filter: "",
  sort: "default",
  noResults: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Post>) => {
      const exists = state.favorites.find((p) => p.id === action.payload.id);
      state.favorites = exists
        ? state.favorites.filter((p) => p.id !== action.payload.id)
        : [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.items.unshift(action.payload);
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.page = 1;
      state.items = [];
      state.noResults = false;
    },
    setSort: (
      state,
      action: PayloadAction<"default" | "alphabet" | "reverse-alphabet">
    ) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.noResults = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items =
          state.page === 1
            ? action.payload
            : [...state.items, ...action.payload];
        state.noResults = state.items.length === 0;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleFavorite, addPost, incrementPage, setFilter, setSort } =
  postsSlice.actions;
export default postsSlice.reducer;
