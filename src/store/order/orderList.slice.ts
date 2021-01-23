import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk } from "store"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/orders`

interface OrderListState {
  loading: boolean
  error: string
  orders: any[]
}

const initialState: OrderListState = { loading: false, error: "", orders: [] }

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    fetchOrderListStart(state) {
      state.error = ""
      state.loading = true
    },
    fetchOrderListSuccess(state, action: PayloadAction<any[]>) {
      state.error = ""
      state.loading = false
      state.orders = action.payload
    },
    fetchOrderListError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

const { fetchOrderListError, fetchOrderListStart, fetchOrderListSuccess } = orderListSlice.actions

export const fetchOrderList = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(fetchOrderListStart())
    const { token } = getState().auth.userInfo
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    const { data } = await axios.get(BASE_URL, config)
    dispatch(fetchOrderListSuccess(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(fetchOrderListError(message))
  }
}

export default orderListSlice.reducer
