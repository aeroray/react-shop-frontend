import axios from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppThunk } from "store"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/products`

interface cartState {
  cartItems: any[]
  shippingAddress: any
  paymentMethod: string
}

const initialState: cartState = { cartItems: [], shippingAddress: {}, paymentMethod: "" }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<any>) {
      const item = action.payload
      const existItem = state.cartItems.find((i) => i.productId === item.productId)
      if (existItem) {
        state.cartItems = state.cartItems.map((i) => (i.productId === existItem.productId ? item : i))
      } else {
        state.cartItems.push(item)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload)
    },
    clearCartItems(state) {
      state.cartItems = []
    },
    saveAddress(state, action: PayloadAction<any>) {
      state.shippingAddress = action.payload
    },
    savePaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload
    },
    setCartEmpty(state) {
      state.cartItems = []
      state.shippingAddress = {}
      state.paymentMethod = ""
    },
  },
})

const { addItem, removeItem, saveAddress, savePaymentMethod, clearCartItems, setCartEmpty } = cartSlice.actions

export const addToCart = (id: string, qty: number): AppThunk => async (dispatch, getState) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`)
  dispatch(
    addItem({
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    })
  )
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id: string): AppThunk => async (dispatch, getState) => {
  dispatch(removeItem(id))
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeAllItemsFromCart = (): AppThunk => async (dispatch, getState) => {
  dispatch(clearCartItems())
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveAddressToCart = (
  country: string,
  city: string,
  postalCode: any,
  address: string,
  phone: string
): AppThunk => async (dispatch, getState) => {
  dispatch(saveAddress({ country, city, postalCode, address, phone }))
  localStorage.setItem("shippingAddress", JSON.stringify(getState().cart.shippingAddress))
}

export const savePaymentMethodToCart = (method: string): AppThunk => async (dispatch, getState) => {
  dispatch(savePaymentMethod(method))
  localStorage.setItem("paymentMethod", JSON.stringify(method))
}

export const emptyCart = (): AppThunk => async (dispatch) => {
  dispatch(setCartEmpty())
}

export default cartSlice.reducer
