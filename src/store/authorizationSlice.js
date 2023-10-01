import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import blogPlatformService from '../service/blogPlatformService'

//----------------------------------------------------------
const extraReducer = (name) =>
  createAsyncThunk(name, async (arg, { rejectWithValue }) => {
    try {
      const data = await blogPlatformService[name](arg)
      if (data.ok) {
        if (arg?.cb) arg.cb()
        return await data.json()
      }
      return rejectWithValue(await data.json())
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  })

const extraReducersPendingedCallback = (state) => {
  state.loading = true
  state.errors = null
}
const extraReducersRejectededCallback = (state, { payload }) => {
  state.loading = false
  if (payload?.errors) state.errors = payload.errors
}
const extraReducersFulfilledCallback = (state, { payload }) => {
  state.loading = false
  state.errors = null

  if (payload?.user.token) {
    state.token = payload.user.token
    localStorage.setItem('token', payload.user.token)
  }
  state.userName = payload.user.username
  state.email = payload.user.email
  state.bio = payload.user.bio
  state.image = payload.user.image
}
//----------------------------------------------------------

export const signUp = extraReducer('signUp')
export const signIn = extraReducer('signIn')
export const getUserData = extraReducer('getUserData')
export const updateUserData = extraReducer('updateUserData')

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    token: localStorage.getItem('token'),
    userName: null,
    email: null,
    bio: null,
    image: null,

    loading: true,
    errors: null,
  },
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token')
      state.token = null
      state.userName = null
      state.email = null
      state.bio = null
      state.image = null

      state.loading = false
      state.errors = null
    },
    clearAuthorizationErrors: (state) => {
      state.errors = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, extraReducersPendingedCallback)
      .addCase(signUp.fulfilled, extraReducersFulfilledCallback)
      .addCase(signUp.rejected, extraReducersRejectededCallback)

      .addCase(signIn.pending, extraReducersPendingedCallback)
      .addCase(signIn.fulfilled, extraReducersFulfilledCallback)
      .addCase(signIn.rejected, extraReducersRejectededCallback)

      .addCase(getUserData.pending, extraReducersPendingedCallback)
      .addCase(getUserData.fulfilled, extraReducersFulfilledCallback)
      .addCase(getUserData.rejected, extraReducersRejectededCallback)

      .addCase(updateUserData.pending, extraReducersPendingedCallback)
      .addCase(updateUserData.fulfilled, extraReducersFulfilledCallback)
      .addCase(updateUserData.rejected, extraReducersRejectededCallback)
  },
})

export default authorizationSlice
