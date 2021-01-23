import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk } from "store"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/orders`

interface orderPayState {
  success: boolean
  loading: boolean
  error: string
  updatedOrder: any
}

const initialState: orderPayState = { loading: false, error: "", success: false, updatedOrder: null }

const orderPaySlice = createSlice({
  name: "orderCreate",
  initialState,
  reducers: {
    payOrderStart(state) {
      state.error = ""
      state.loading = true
      state.success = false
    },
    payOrderSuccess(state, action: PayloadAction<any>) {
      state.error = ""
      state.loading = false
      state.success = true
      state.updatedOrder = action.payload
    },
    payOrderError(state, action: PayloadAction<string>) {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    payOrderReset(state) {
      state.error = ""
      state.loading = false
      state.success = false
      state.updatedOrder = null
    },
  },
})

const { payOrderError, payOrderStart, payOrderSuccess, payOrderReset } = orderPaySlice.actions

export const payOrder = (orderId: string, paymentResult: any): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(payOrderStart())
    const { token } = getState().auth.userInfo
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    const { data } = await axios.put(`${BASE_URL}/${orderId}/pay`, paymentResult, config)
    dispatch(payOrderSuccess(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(payOrderError(message))
  }
}

export const resetOrderPay = (): AppThunk => async (dispatch) => {
  dispatch(payOrderReset())
}

export default orderPaySlice.reducer
