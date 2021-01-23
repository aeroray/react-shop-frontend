import { FC, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AccountBookOutlined, CreditCardOutlined, EnvironmentOutlined } from "@ant-design/icons"
import { Button, Card, Col, Divider, Row, Typography } from "antd"
import styled from "@emotion/styled"

import { RootState } from "store"
import { CartTable, StepNav } from "components"
import { removeAllItemsFromCart } from "store/cart/cart.slice"

import useCreateOrder from "hooks/useCreateOrder"

const Order: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { createLoading, createOrder, createSuccess, orderId } = useCreateOrder()

  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { shippingAddress, paymentMethod, cartItems } = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else if (!shippingAddress) {
      history.push("/shipping")
    } else if (!paymentMethod) {
      history.push("/payment")
    } else if (createSuccess) {
      history.push(`/order/${orderId}`)
      dispatch(removeAllItemsFromCart())
    }
  }, [history, dispatch, userInfo, shippingAddress, paymentMethod, createSuccess, orderId])

  const itemsPrice = Math.round(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))
  const shippingPrice = itemsPrice >= 10000 ? 0 : 1000
  const taxPrice = Math.round(itemsPrice * 0.1)
  const totalPrice = itemsPrice + shippingPrice + taxPrice

  const handleOrderSubmit = () =>
    createOrder(userInfo.token, {
      orderItems: cartItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      shippingAddress,
    })

  return (
    <>
      <Helmet>
        <title>スマイルショップ | 注文確認</title>
      </Helmet>
      <StepNav step={2} />
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <Container title='注文内容を確認'>
            <Typography.Title level={4}>
              <EnvironmentOutlined style={{ marginRight: "1rem" }} />
              お届け先
            </Typography.Title>
            <Divider />
            <Typography.Paragraph strong>国/地域:　{shippingAddress.country}</Typography.Paragraph>
            <Typography.Paragraph strong>郵便番号:　{shippingAddress.postalCode}</Typography.Paragraph>
            <Typography.Paragraph strong>都道府県:　{shippingAddress.city}</Typography.Paragraph>
            <Typography.Paragraph strong>住所:　{shippingAddress.address}</Typography.Paragraph>
            <Typography.Paragraph strong>電話番号:　{shippingAddress.phone}</Typography.Paragraph>
            <Divider />
            <Typography.Title level={4}>
              <CreditCardOutlined style={{ marginRight: "1rem" }} />
              お支払い方法
            </Typography.Title>
            <Divider />
            <Typography.Paragraph strong>{paymentMethod}</Typography.Paragraph>
            <Divider />
            <Typography.Title level={4}>
              <AccountBookOutlined style={{ marginRight: "1rem" }} />
              注文詳細
            </Typography.Title>
            <Divider />
            <CartTable cartItems={cartItems} />
          </Container>
        </Col>
        <Col xs={24} lg={8}>
          <Container>
            <Typography.Title level={4} style={{ display: "flex" }}>
              <span style={{ marginRight: "auto" }}>注文内容</span>
              <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}件</span>
            </Typography.Title>
            <Divider />
            <Typography.Text style={{ display: "flex", fontSize: "1.8rem" }}>
              <span style={{ marginRight: "auto" }}>商品合計</span>
              <span>${itemsPrice}</span>
            </Typography.Text>
            <Typography.Text style={{ display: "flex", fontSize: "1.8rem", margin: "1rem 0" }}>
              <span style={{ marginRight: "auto" }}>送料</span>
              <span>${shippingPrice}</span>
            </Typography.Text>
            <Typography.Text style={{ display: "flex", fontSize: "1.8rem" }}>
              <span style={{ marginRight: "auto" }}>消費税</span>
              <span>${taxPrice}</span>
            </Typography.Text>
            <Divider />
            <Typography.Text style={{ display: "flex", fontSize: "1.8rem", fontWeight: 600 }}>
              <span style={{ marginRight: "auto" }}>合計(税込み)</span>
              <span>${totalPrice}</span>
            </Typography.Text>
            <Divider />
            <Button
              loading={createLoading}
              size='large'
              type='primary'
              style={{ width: "100%" }}
              onClick={handleOrderSubmit}
            >
              注文を確定する
            </Button>
            <Divider />
            <Button
              disabled={createLoading}
              size='large'
              style={{ width: "100%" }}
              onClick={() => history.push("/payment")}
            >
              お支払い方法に戻る
            </Button>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default Order

const Container = styled(Card)`
  margin-top: 4rem;
  .ant-card-head {
    font-size: 3rem;
    font-weight: 500;
  }
`
