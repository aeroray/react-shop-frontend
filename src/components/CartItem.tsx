import { FC } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { DeleteOutlined } from "@ant-design/icons"
import { Button, Image, Row, Col, Typography, Divider, InputNumber } from "antd"
import styled from "@emotion/styled"

import { addToCart, removeFromCart } from "store/cart/cart.slice"

interface CartItemProps {
  item: any
  idx: number
  length: number
}

export const CartItem: FC<CartItemProps> = ({ item, idx, length }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Row key={item.productId} gutter={[32, 32]} style={{ alignItems: "center" }}>
      <Col xs={24} md={6}>
        <Image src={item.image} alt={item.name} loading='lazy' preview={false} />
      </Col>
      <Title xs={24} md={6} onClick={() => history.push(`/product/${item.productId}`)}>
        <Typography.Title ellipsis={{ rows: 3 }} level={3}>
          {item.name}
        </Typography.Title>
      </Title>
      <Col md={4}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          ${item.price}
        </Typography.Title>
      </Col>
      <Col md={4}>
        <InputNumber
          min={1}
          max={item.countInStock}
          value={item.qty}
          onChange={(value) => {
            if (typeof value === "number") dispatch(addToCart(item.productId, value))
          }}
        />
      </Col>
      <Col md={4}>
        <Button danger icon={<DeleteOutlined />} onClick={() => dispatch(removeFromCart(item.productId))}>
          削除
        </Button>
      </Col>
      {idx !== length - 1 && <Divider />}
    </Row>
  )
}

const Title = styled(Col)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
