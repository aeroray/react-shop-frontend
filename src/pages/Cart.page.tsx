import { Helmet } from "react-helmet"
import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { Empty, Button, Card, Row, Col, Typography, Divider } from "antd"

import { RootState } from "store"
import { addToCart } from "store/cart/cart.slice"
import { CartItem } from "components"

const Cart: FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { cartItems } = useSelector((state: RootState) => state.cart)

  const qty = location.search ? +location.search.split("=")[1] : 1

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [id, dispatch, qty])

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>スマイルショップ | ショッピングカート</title>
        </Helmet>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{ height: 60 }}
          description={<span>お客様のショッピングカートには商品がありません。</span>}
        >
          <Button type='primary' onClick={() => history.push("/")}>
            お買い物を続ける
          </Button>
        </Empty>
      </>
    )
  } else {
    return (
      <>
        <Helmet>
          <title>スマイルショップ | ショッピングカート</title>
        </Helmet>
        <Divider orientation='left' style={{ fontSize: "2rem" }}>
          カート
        </Divider>
        <Row gutter={[32, 32]}>
          <Col xs={24} xl={17}>
            <Card>
              {cartItems.map((item, idx) => (
                <CartItem key={item.productId} item={item} length={cartItems.length} idx={idx} />
              ))}
            </Card>
          </Col>
          <Col xs={24} xl={7}>
            <Card style={{ textAlign: "center" }}>
              <Typography.Title level={4} style={{ display: "flex" }}>
                <span style={{ marginRight: "auto" }}>注文内容</span>
                <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}件</span>
              </Typography.Title>
              <Divider />
              <Typography.Text style={{ display: "flex", fontSize: "1.8rem" }}>
                <span style={{ marginRight: "auto" }}>商品合計</span>
                <span>${Math.round(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}</span>
              </Typography.Text>
              <Divider />
              <Button
                size='large'
                style={{ width: "100%" }}
                type='primary'
                onClick={() => history.push("/login?redirect=shipping")}
              >
                購入手続きへ
              </Button>
              <Divider />
              <Button size='large' style={{ width: "100%" }} onClick={() => history.push("/")}>
                お買い物を続ける
              </Button>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default Cart
