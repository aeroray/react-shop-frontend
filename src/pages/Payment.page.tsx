import { Helmet } from "react-helmet"
import { FC, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Card, Divider, Radio } from "antd"
import styled from "@emotion/styled"

import { RootState } from "store"
import { StepNav } from "components"
import { savePaymentMethodToCart } from "store/cart/cart.slice"

const Payment: FC = () => {
  const formRef = useRef<any>()
  const history = useHistory()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { shippingAddress, paymentMethod } = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else if (!shippingAddress) {
      history.push("/shipping")
    } else if (paymentMethod) {
      formRef.current.setFieldsValue({ method: paymentMethod })
    }
  }, [history, userInfo, shippingAddress, paymentMethod])

  const onFinish = (values: { method: string }) => {
    dispatch(savePaymentMethodToCart(values.method))
    history.push("/placeorder")
  }

  return (
    <>
      <Helmet>
        <title>スマイルショップ | お支払い方法</title>
      </Helmet>
      <StepNav step={1} />
      <Container title='お支払い方法を選択'>
        <Form ref={formRef} layout='vertical' onFinish={onFinish} validateTrigger='onBlur'>
          <Form.Item
            name='method'
            label='次の選択肢から一つ選んでください'
            rules={[{ required: true, message: "お支払い方法が必須です。" }]}
          >
            <Radio.Group style={{ display: "flex", textAlign: "center" }}>
              <Radio.Button style={{ flex: 1 }} value='ペイパル'>
                PayPal
              </Radio.Button>
              <Radio.Button value='クレジットカード'>クレジットカード</Radio.Button>
              <Radio.Button style={{ flex: 1 }} value='ストライプ'>
                Stripe
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button size='large' type='primary' htmlType='submit' style={{ width: "100%" }}>
              注文内容を確認する
            </Button>
            <Divider />
            <Button size='large' style={{ width: "100%" }} onClick={() => history.push("/shipping")}>
              アドレスに戻る
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </>
  )
}

export default Payment

const Container = styled(Card)`
  width: 40rem;
  margin: 0 auto;
  margin-top: 4rem;
  .ant-card-head {
    font-size: 3rem;
    font-weight: 500;
    text-align: center;
  }
`
