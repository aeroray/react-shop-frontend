import { FC, useEffect } from "react"
import { Helmet } from "react-helmet"
import { PayPalButton } from "react-paypal-button-v2"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Card, Col, Divider, Row, Spin, Typography } from "antd"
import { AccountBookOutlined, CreditCardOutlined, EnvironmentOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"

import { RootState } from "store"
import { CartTable, Spinner } from "components"
import { getOrderDetails } from "store/order/orderDetails.slice"

import usePayPal from "hooks/usePayPal"
import useOrderPay from "hooks/useOrderPay"
import useOrderDeliver from "hooks/useOrderDeliver"

const Order: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()

  const { sdkReady } = usePayPal()
  const { updateOrderToPaid, payLoading, paySuccess } = useOrderPay()
  const { updateLoading, updateOrderToDelivered, updateSuccess } = useOrderDeliver()

  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { loading, error, order } = useSelector((state: RootState) => state.orderDetails)
  const { shippingAddress, paymentMethod, orderItems, shippingPrice, taxPrice, totalPrice } = order
  const itemsPrice = Math.round(orderItems.reduce((acc: number, item: any) => acc + item.qty * item.price, 0))

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
    dispatch(getOrderDetails(id))
  }, [dispatch, userInfo, history, id, updateSuccess, paySuccess])

  const handlePaymentSuccess = (paymentResult: any) => updateOrderToPaid(order._id, paymentResult, userInfo.token)

  if (loading) return <Spinner />

  return (
    <>
      <Helmet>
        <title>スマイルショップ | 注文詳細</title>
      </Helmet>
      {error && <Alert message='エラー' description={error} type='error' showIcon closable />}
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <Container title={`注文番号 ${order._id}`}>
            <Typography.Title level={4}>
              <EnvironmentOutlined style={{ marginRight: "1rem" }} />
              お届け先
            </Typography.Title>
            <Divider />
            <Typography.Paragraph strong>名前:　{order.user?.name}</Typography.Paragraph>
            <Typography.Paragraph strong>国/地域:　{shippingAddress.country}</Typography.Paragraph>
            <Typography.Paragraph strong>郵便番号:　{shippingAddress.postalCode}</Typography.Paragraph>
            <Typography.Paragraph strong>都道府県:　{shippingAddress.city}</Typography.Paragraph>
            <Typography.Paragraph strong>住所:　{shippingAddress.address}</Typography.Paragraph>
            <Typography.Paragraph strong>電話番号:　{shippingAddress.phone}</Typography.Paragraph>
            {order.isDelivered ? (
              <Alert
                message={`${new Date(order.deliveredAt).toLocaleString("ja-JP")} に発送しました。`}
                type='success'
                showIcon
              />
            ) : (
              <Alert message='未発送' type='error' showIcon />
            )}
            <Divider />
            <Typography.Title level={4}>
              <CreditCardOutlined style={{ marginRight: "1rem" }} />
              お支払い方法
            </Typography.Title>
            <Divider />
            <Typography.Paragraph strong>{paymentMethod}</Typography.Paragraph>
            {order.isPaid ? (
              <Alert
                message={`${new Date(order.paidAt).toLocaleString("ja-JP")} に支払いました。`}
                type='success'
                showIcon
              />
            ) : (
              <Alert message='未払い' type='error' showIcon />
            )}
            <Divider />
            <Typography.Title level={4}>
              <AccountBookOutlined style={{ marginRight: "1rem" }} />
              注文詳細
            </Typography.Title>
            <Divider />
            <CartTable cartItems={orderItems} />
          </Container>
        </Col>
        <Col xs={24} lg={8}>
          <Container>
            <Typography.Title level={4} style={{ display: "flex" }}>
              <span style={{ marginRight: "auto" }}>注文内容</span>
              <span>{orderItems.reduce((acc: number, item: any) => acc + item.qty, 0)}件</span>
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
            {!order.isPaid && (
              <div style={{ marginTop: "2rem" }}>
                {!sdkReady || payLoading ? (
                  <Spin />
                ) : (
                  <PayPalButton amount={totalPrice} onSuccess={handlePaymentSuccess} />
                )}
              </div>
            )}
            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <Button
                loading={updateLoading}
                size='large'
                type='primary'
                danger
                style={{ width: "100%", marginTop: "2rem" }}
                onClick={async () => await updateOrderToDelivered(id, userInfo.token)}
              >
                発送済みにする
              </Button>
            )}
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
