import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk } from "store"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/products`

interface ProductListState {
  loading: boolean
  error: string
  count?: number
  products: any[]
}

const initialState: ProductListState = { loading: false, error: "", products: [] }

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    fetchProductListStart(state) {
      state.error = ""
      state.loading = true
    },
    fetchProductListSuccess(state, action: PayloadAction<{ products: any[]; count: number }>) {
      state.error = ""
      state.loading = false
      state.count = action.payload.count
      state.products = action.payload.products
    },
    fetchProductListError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

const { fetchProductListError, fetchProductListStart, fetchProductListSuccess } = productListSlice.actions

export const fetchProductList = (keyword: string = "", page: number = 1): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchProductListStart())
    const { data } = await axios.get(`${BASE_URL}?keyword=${keyword}&page=${page}`)
    dispatch(fetchProductListSuccess(data))
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch(fetchProductListError(message))
  }
}

export default productListSlice.reducer
