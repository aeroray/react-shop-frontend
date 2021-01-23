import { FC } from "react"
import { Image, Table } from "antd"
import styled from "@emotion/styled"

import { Link } from "react-router-dom"

export const CartTable: FC<{ cartItems: any[] }> = ({ cartItems }) => {
  const dataSource = cartItems.map((item) => ({
    key: item.productId,
    name: item.name,
    image: item.image,
    price: "$" + item.price,
    qty: item.qty,
    sum: "$" + Math.round(item.price * item.qty),
  }))

  return <StyledTable pagination={{ pageSize: 2 }} columns={columns} dataSource={dataSource} />
}

const columns = [
  {
    title: "商品画像",
    dataIndex: "image",
    key: "image",
    render: (text: string) => <Image src={text} preview={false} />,
  },
  {
    title: "商品名",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    render: (text: string, record: any) => <Title to={`/product/${record.key}`}>{text}</Title>,
  },
  {
    title: "数量",
    dataIndex: "qty",
    key: "qty",
    width: 100,
    render: (text: string) => <Info>{text}</Info>,
  },
  {
    title: "価格",
    dataIndex: "price",
    key: "price",
    width: 120,
    render: (text: string) => <Info>{text}</Info>,
  },
  {
    title: "小計",
    dataIndex: "sum",
    key: "sum",
    width: 120,
    render: (text: string) => <Info>{text}</Info>,
  },
]

const StyledTable = styled(Table)`
  th {
    font-size: 1.6rem;
  }
`

const Title = styled(Link)`
  color: currentColor;
  font-size: 2rem;
  &:hover {
    color: currentColor;
    text-decoration: underline;
  }
`

const Info = styled.span`
  font-size: 1.8rem;
`
