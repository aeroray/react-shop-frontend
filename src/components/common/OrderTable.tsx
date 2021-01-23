import { FC } from "react"
import { Empty, Table, Tag } from "antd"
import styled from "@emotion/styled"

import { Link } from "react-router-dom"
import { CheckCircleTwoTone } from "@ant-design/icons"

export const OrderTable: FC<{ orders: any[] }> = ({ orders }) => {
  const dataSource = orders.map((order) => ({
    key: order._id,
    id: order._id,
    date: new Date(order.createdAt).toLocaleString("ja-JP"),
    total: "$" + order.totalPrice,
    paid: order.isPaid,
    paidAt: order.paidAt,
    delivered: order.isDelivered,
    deliveredAt: order.deliveredAt,
  }))

  if (orders.length === 0) return <Empty />

  return <StyledTable pagination={{ pageSize: 5 }} columns={columns} dataSource={dataSource} />
}

const columns = [
  {
    title: "注文番号",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
    render: (text: string, record: any) => <Title to={`/order/${record.key}`}>{text}</Title>,
  },
  {
    title: "注文日時",
    dataIndex: "date",
    key: "date",
    ellipsis: true,
    render: (text: string) => <Info>{text}</Info>,
  },
  {
    title: "合計金額",
    dataIndex: "total",
    key: "total",
    width: 100,
    render: (text: string) => <Info>{text}</Info>,
  },
  {
    title: "支払い状況",
    dataIndex: "paid",
    key: "paid",
    ellipsis: true,
    render: (isPaid: boolean, record: any) => (
      <>
        {isPaid ? (
          <Info>
            <CheckCircleTwoTone twoToneColor='#52c41a' style={{ marginRight: 5 }} />
            {new Date(record.paidAt).toLocaleString("ja-JP")}
          </Info>
        ) : (
          <Tag color='red'>未払い</Tag>
        )}
      </>
    ),
  },
  {
    title: "配送状況",
    dataIndex: "delivered",
    key: "delivered",
    ellipsis: true,
    render: (isDelivered: boolean, record: any) => (
      <>
        {isDelivered ? (
          <Info>
            <CheckCircleTwoTone twoToneColor='#52c41a' style={{ marginRight: 5 }} />
            {new Date(record.deliveredAt).toLocaleString("ja-JP")}
          </Info>
        ) : (
          <Tag color='red'>未発送</Tag>
        )}
      </>
    ),
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
