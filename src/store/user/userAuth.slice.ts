import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk } from "store"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/users`

interface UserAuthState {
  loading: boolean
  error: string
  userInfo: any
}

const initialState: UserAuthState = { loading: false, error: "", userInfo: null }

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userAuthStart(state) {
      state.error = ""
      state.loading = true
    },
    userAuthSuccess(state, action: PayloadAction<any>) {
      state.error = ""
      state.loading = false
      state.userInfo = action.payload
    },
    userAuthError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    userLogout(state) {
      state.error = ""
      state.loading = false
      state.userInfo = null
    },
  },
})

const { userAuthError, userAuthStart, userAuthSuccess, userLogout } = userAuthSlice.actions

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    dispatch(userAuthStart())
    const config = { headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(`${BASE_URL}/login`, { email, password }, config)
    dispatch(userAuthSuccess(data))
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(userAuthError(message))
  }
}

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(userLogout())
    localStorage.clear()
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(userAuthError(message))
  }
}

export const register = (name: string, email: string, password: string): AppThunk => async (dispatch) => {
  try {
    dispatch(userAuthStart())
    const config = { headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(BASE_URL, { name, email, password }, config)
    dispatch(userAuthSuccess(data))
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(userAuthError(message))
  }
}

export const updateProfile = (name: string, email: string, password: string): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(userAuthStart())
    const { token } = getState().auth.userInfo
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    const { data } = await axios.put(`${BASE_URL}/profile`, { name, email, password }, config)
    dispatch(userAuthSuccess(data))
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(userAuthError(message))
  }
}

export default userAuthSlice.reducer
