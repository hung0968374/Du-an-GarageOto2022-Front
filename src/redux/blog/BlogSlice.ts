import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BlogItemInterface } from '../../pages/client/blog/BlogItem';

export interface BlogType {
  [key: string]: Array<BlogItemInterface>;
}
type BlogsState = {
  blogs: BlogType;
};

const initialState: BlogsState = { blogs: {} };

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogValues: (state: BlogsState, action: PayloadAction<BlogType>) => {
      state.blogs = { ...state.blogs, ...action.payload };
    },
  },
});

export const { setBlogValues } = blogSlice.actions;

export default blogSlice.reducer;
