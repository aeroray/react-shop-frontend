import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk } from "store"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/products`

interface ProductDetailState {
  loading: boolean
  error: string
  product: any
}

const initialState: ProductDetailState = { loading: false, error: "", product: {} }

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    fetchProductDetailStart(state) {
      state.error = ""
      state.loading = true
    },
    fetchProductDetailSuccess(state, action: PayloadAction<any>) {
      state.error = ""
      state.loading = false
      state.product = action.payload
    },
    fetchProductDetailError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

const { fetchProductDetailError, fetchProductDetailStart, fetchProductDetailSuccess } = productDetailSlice.actions

export const fetchProductDetail = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchProductDetailStart())
    const { data } = await axios.get(`${BASE_URL}/${id}`)
    dispatch(fetchProductDetailSuccess(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(fetchProductDetailError(message))
  }
}

export default productDetailSlice.reducer
