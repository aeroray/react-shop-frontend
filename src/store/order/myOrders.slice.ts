import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk } from "store"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/orders`

interface myOrdersState {
  loading: boolean
  error: string
  success: boolean
  orders: any[]
}

const initialState: myOrdersState = { loading: false, error: "", orders: [], success: false }

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    fetchMyOrdersStart(state) {
      state.error = ""
      state.loading = true
      state.success = false
    },
    fetchMyOrdersSuccess(state, action: PayloadAction<any[]>) {
      state.error = ""
      state.loading = false
      state.success = true
      state.orders = action.payload
    },
    fetchMyOrdersError(state, action: PayloadAction<string>) {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    fetchMyOrdersReset(state) {
      state.error = ""
      state.loading = false
      state.success = false
      state.orders = []
    },
  },
})

const { fetchMyOrdersError, fetchMyOrdersReset, fetchMyOrdersStart, fetchMyOrdersSuccess } = myOrdersSlice.actions

export const getMyOrders = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(fetchMyOrdersStart())
    const { token } = getState().auth.userInfo
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    const { data } = await axios.get(`${BASE_URL}/myorders`, config)
    dispatch(fetchMyOrdersSuccess(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(fetchMyOrdersError(message))
  }
}

export const resetMyOrders = (): AppThunk => async (dispatch) => {
  dispatch(fetchMyOrdersReset())
}

export default myOrdersSlice.reducer
