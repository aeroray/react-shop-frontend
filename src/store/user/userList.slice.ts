import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk } from "store"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/users`

interface UserListState {
  loading: boolean
  error: string
  users: any[]
}

const initialState: UserListState = { loading: false, error: "", users: [] }

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    userListStart(state) {
      state.error = ""
      state.loading = true
    },
    userListSuccess(state, action: PayloadAction<any[]>) {
      state.error = ""
      state.loading = false
      state.users = action.payload
    },
    userListError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    userListReset(state) {
      state.loading = false
      state.error = ""
      state.users = []
    },
  },
})

const { userListError, userListStart, userListSuccess, userListReset } = userListSlice.actions

export const getAllUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(userListStart())
    const { token } = getState().auth.userInfo
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    const { data } = await axios.get(BASE_URL, config)
    dispatch(userListSuccess(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(userListError(message))
  }
}

export const resetUserList = (): AppThunk => async (dispatch) => {
  dispatch(userListReset())
}

export default userListSlice.reducer
