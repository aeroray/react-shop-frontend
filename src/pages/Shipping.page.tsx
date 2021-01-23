import { Helmet } from "react-helmet"
import { FC, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Form, Input, Button, Card } from "antd"
import styled from "@emotion/styled"

import { RootState } from "store"
import { StepNav } from "components"
import { saveAddressToCart } from "store/cart/cart.slice"

const Shipping: FC = () => {
  const formRef = useRef<any>()
  const history = useHistory()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { shippingAddress } = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
    if (shippingAddress) {
      const { country, address, city, postalCode, phone } = shippingAddress
      formRef.current.setFieldsValue({ country, address, city, postalCode, phone })
    }
  }, [history, userInfo, shippingAddress])

  const onFinish = (values: any) => {
    const { country, address, city, postalCode, phone } = values
    dispatch(saveAddressToCart(country, city, postalCode, address, phone))
    history.push("/payment")
  }

  return (
    <>
      <Helmet>
        <title>スマイルショップ | アドレス</title>
      </Helmet>
      <StepNav step={0} />
      <Container title='アドレスを入力'>
        <Form ref={formRef} layout='vertical' onFinish={onFinish} validateTrigger='onBlur'>
          <Form.Item name='country' label='国/地域' rules={[{ required: true, message: "国/地域が必須です。" }]}>
            <Input size='large' type='text' />
          </Form.Item>
          <Form.Item label='郵便番号' name='postalCode' rules={[{ required: true, message: "郵便番号が必須です。" }]}>
            <Input size='large' type='number' />
          </Form.Item>
          <Form.Item name='city' label='都道府県' rules={[{ required: true, message: "都道府県が必須です。" }]}>
            <Input size='large' type='text' />
          </Form.Item>
          <Form.Item name='address' label='住所' rules={[{ required: true, message: "住所が必須です。" }]}>
            <Input size='large' type='text' />
          </Form.Item>
          <Form.Item name='phone' label='電話番号' rules={[{ required: true, message: "電話番号が必須です。" }]}>
            <Input size='large' type='number' />
          </Form.Item>
          <Form.Item>
            <Button size='large' type='primary' htmlType='submit' style={{ width: "100%" }}>
              お支払い方法を選択する
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </>
  )
}

export default Shipping

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
