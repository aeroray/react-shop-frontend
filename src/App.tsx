import { FC, lazy, Suspense } from "react"
import { Layout } from "antd"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import styled from "@emotion/styled"

import { Header, Footer, Spinner, MessageLoop } from "./components"

const Home = lazy(() => import("./pages/Home.page"))
const Cart = lazy(() => import("./pages/Cart.page"))
const Order = lazy(() => import("./pages/Order.page"))
const Login = lazy(() => import("./pages/Login.page"))
const Profile = lazy(() => import("./pages/Profile.page"))
const Product = lazy(() => import("./pages/Product.page"))
const Payment = lazy(() => import("./pages/Payment.page"))
const Register = lazy(() => import("./pages/Register.page"))
const Shipping = lazy(() => import("./pages/Shipping.page"))
const NotFound = lazy(() => import("./pages/NotFound.page"))
const PlaceOrder = lazy(() => import("./pages/PlaceOrder.page"))
// 管理员限定
const Users = lazy(() => import("./pages/admin/Users.page"))
const Orders = lazy(() => import("./pages/admin/Orders.page"))
const Products = lazy(() => import("./pages/admin/Products.page"))

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <MessageLoop />
      <Content>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/order/:id' component={Order} />
            <Route path='/placeorder' exact component={PlaceOrder} />
            <Route path='/payment' exact component={Payment} />
            <Route path='/profile' exact component={Profile} />
            <Route path='/Shipping' exact component={Shipping} />
            <Route path='/register' exact component={Register} />
            <Route path='/product/:id' component={Product} />
            <Route path='/cart/:id?' component={Cart} />
            <Route path='/admin/users' exact component={Users} />
            <Route path='/admin/orders' exact component={Orders} />
            <Route path='/admin/products' exact component={Products} />
            <Route path='/search/:keyword' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Content>
      <Footer />
    </BrowserRouter>
  )
}

export default App

const Content = styled(Layout.Content)`
  min-height: calc(100vh - 17.5rem);
  margin: 0 auto;
  padding: 2rem;
`
