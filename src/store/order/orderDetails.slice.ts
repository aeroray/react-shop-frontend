import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk } from "store"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/orders`

interface orderDetailsState {
  loading: boolean
  error: string
  order: any
}

const initialState: orderDetailsState = { loading: false, error: "", order: { shippingAddress: {}, orderItems: [] } }

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    fetchOrderDetailsStart(state) {
      state.error = ""
      state.loading = true
    },
    fetchOrderDetailsSuccess(state, action: PayloadAction<any>) {
      state.error = ""
      state.loading = false
      state.order = action.payload
    },
    fetchOrderDetailsError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

const { fetchOrderDetailsError, fetchOrderDetailsStart, fetchOrderDetailsSuccess } = orderDetailsSlice.actions

export const getOrderDetails = (id: string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(fetchOrderDetailsStart())
    const { token } = getState().auth.userInfo
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    const { data } = await axios.get(`${BASE_URL}/${id}`, config)
    dispatch(fetchOrderDetailsSuccess(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(fetchOrderDetailsError(message))
  }
}

export default orderDetailsSlice.reducer
