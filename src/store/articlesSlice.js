import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import blogPlatformService from '../service/blogPlatformService'

export const getArticlesList = createAsyncThunk('getArticlesList', async (args, { rejectWithValue }) => {
  try {
    const data = await blogPlatformService.getArticlesList(args.pageNumber, args?.token)
    if (!data.ok) rejectWithValue('Error')
    return await data.json()
  } catch (error) {
    return rejectWithValue('Error')
  }
})
const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState: {
    currentPage: 1,
    totalArticles: 0,
    loading: false,
    error: false,
    articles: [],
  },
  reducers: {
    togglePage: (state, action) => {
      state.currentPage = +action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticlesList.pending, (state) => {
        state.loading = true
        state.error = false
        state.articles = []
        state.totalArticles = 0
      })
      .addCase(getArticlesList.fulfilled, (state, action) => {
        state.totalArticles = action.payload.articlesCount
        state.articles = action.payload.articles
        state.loading = false
        state.error = false
      })
      .addCase(getArticlesList.rejected, (state) => {
        state.error = true
        state.loading = false
        state.articles = []
        state.totalArticles = 0
      })
  },
})

export default articlesListSlice
