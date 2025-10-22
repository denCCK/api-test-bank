import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "./postTypes";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page, filter }: { page: number; filter: string }) => {
    let url = `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`;
    if (filter) url += `&title_like=${encodeURIComponent(filter)}`;
    const response = await fetch(url);
    return (await response.json()) as Post[];
  }
);
