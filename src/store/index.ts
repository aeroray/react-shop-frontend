import { ThunkAction } from "redux-thunk"
import { configureStore, Action } from "@reduxjs/toolkit"

import rootReducer from "./root.reducer"

const userInfoFromLS = localStorage.getItem("userInfo")
const cartItemsFromLS = localStorage.getItem("cartItems")
const paymentMethodFromLS = localStorage.getItem("paymentMethod")
const shippingAddressFromLS = localStorage.getItem("shippingAddress")

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cart: {
      cartItems: cartItemsFromLS ? JSON.parse(cartItemsFromLS) : [],
      paymentMethod: paymentMethodFromLS ? JSON.parse(paymentMethodFromLS) : "",
      shippingAddress: shippingAddressFromLS ? JSON.parse(shippingAddressFromLS) : {},
    },
    auth: { userInfo: userInfoFromLS ? JSON.parse(userInfoFromLS) : null },
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
