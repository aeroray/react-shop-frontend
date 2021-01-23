import { combineReducers } from "@reduxjs/toolkit"

import cartReducer from "./cart/cart.slice"
import userAuthReducer from "./user/userAuth.slice"
import userListReducer from "./user/userList.slice"
import myOrdersReducer from "./order/myOrders.slice"
import orderListReducer from "./order/orderList.slice"
import orderDetailsReducer from "./order/orderDetails.slice"
import productListReducer from "./product/productList.slice"
import productDetailReducer from "./product/productDetail.slice"

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: userAuthReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
  myOrders: myOrdersReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
})

export default rootReducer
