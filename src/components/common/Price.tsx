import { FC } from "react"
import { Typography } from "antd"
import styled from "@emotion/styled"

interface PriceProps {
  price: number
}

export const Price: FC<PriceProps> = ({ price }) => {
  return <Container level={3}>${price}</Container>
}

const Container = styled(Typography.Title)`
  margin-top: 1rem;
  margin-bottom: 0 !important;
`
