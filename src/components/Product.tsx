import { FC } from "react"
import { Card, Typography, Image } from "antd"
import { useHistory } from "react-router-dom"

import { Rating, Price } from "components"

export const Product: FC<{ product: any }> = ({ product }) => {
  const history = useHistory()

  return (
    <Card
      hoverable
      cover={<Image alt={product.name} src={product.image} loading='lazy' preview={false} />}
      onClick={() => history.push(`/product/${product._id}`)}
    >
      <Typography.Title level={4} ellipsis>
        {product.name}
      </Typography.Title>
      <Rating rating={product.rating} numReviews={product.numReviews} />
      <Price price={product.price} />
    </Card>
  )
}
