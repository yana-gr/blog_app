import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import blogPlatformService from '../service/blogPlatformService'

//----------------------------------------------------------
const extraReducer = (name) =>
  createAsyncThunk(name, async (arg, { rejectWithValue }) => {
    const deleteCase = name === 'deleteArticle'
    try {
      const data = await blogPlatformService[name](arg)
      if (data.ok) {
        if (arg?.cb) arg.cb()
        return !deleteCase && (await data.json())
      }
      return rejectWithValue(!deleteCase && (await data.json()))
    } catch (error) {
      return rejectWithValue(!deleteCase && error.response.data)
    }
  })

const extraReducersPendingedCallback = (state) => {
  state.article = null
  state.loading = true
  state.error = false
}
const extraReducersRejectededCallback = (state) => {
  state.article = null
  state.loading = false
  state.error = true
}
const extraReducersFulfilledCallback = (state, { payload }) => {
  state.loading = false
  state.error = false
  if (payload?.article) {
    state.article = payload.article
  }
}
//----------------------------------------------------------

export const postArticle = extraReducer('postArticle')
export const getArticle = extraReducer('getArticle')
export const editeArticle = extraReducer('editeArticle')
export const deleteArticle = extraReducer('deleteArticle')

const openedArticleSlice = createSlice({
  name: 'openedArticle',
  initialState: {
    article: null,
    loading: false,
    error: false,
  },
  reducers: {
    clearArticleError: (state) => {
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticle.pending, extraReducersPendingedCallback)
      .addCase(getArticle.fulfilled, extraReducersFulfilledCallback)
      .addCase(getArticle.rejected, extraReducersRejectededCallback)

      .addCase(postArticle.pending, extraReducersPendingedCallback)
      .addCase(postArticle.fulfilled, extraReducersFulfilledCallback)
      .addCase(postArticle.rejected, extraReducersRejectededCallback)

      .addCase(editeArticle.pending, extraReducersPendingedCallback)
      .addCase(editeArticle.fulfilled, extraReducersFulfilledCallback)
      .addCase(editeArticle.rejected, extraReducersRejectededCallback)

      .addCase(deleteArticle.pending, extraReducersPendingedCallback)
      .addCase(deleteArticle.fulfilled, extraReducersFulfilledCallback)
      .addCase(deleteArticle.rejected, extraReducersRejectededCallback)
  },
})

export default openedArticleSlice
