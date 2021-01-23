import { FC, useEffect } from "react"
import { Helmet } from "react-helmet"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Divider, Empty, Table, Tag } from "antd"
import { CheckCircleTwoTone } from "@ant-design/icons"
import styled from "@emotion/styled"

import { RootState } from "store"
import { Spinner } from "components"
import { fetchOrderList } from "store/order/orderList.slice"

const Orders: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { error, loading, orders } = useSelector((state: RootState) => state.orderList)

  const dataSource = orders.map((order) => ({
    key: order._id,
    id: order._id,
    name: order.user.name,
    date: new Date(order.createdAt).toLocaleString("ja-JP"),
    total: "$" + order.totalPrice,
    paid: order.isPaid,
    paidAt: order.paidAt,
    delivered: order.isDelivered,
    deliveredAt: order.deliveredAt,
  }))

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push("/")
    }
    dispatch(fetchOrderList())
  }, [userInfo, history, dispatch])

  if (loading) return <Spinner />
  if (error) return <Alert message='エラー' description={error} type='error' showIcon closable />
  if (orders.length === 0) return <Empty />

  return (
    <>
      <Helmet>
        <title>スマイルショップ | 注文一覧</title>
      </Helmet>
      <Divider orientation='left' style={{ fontSize: "2rem" }}>
        注文一覧
      </Divider>
      <StyledTable scroll={{ x: 768 }} pagination={{ pageSize: 8 }} columns={columns} dataSource={dataSource} />
    </>
  )
}

export default Orders

const columns = [
  {
    title: "注文番号",
    dataIndex: "id",
    ellipsis: true,
    render: (text: string, record: any) => <Title to={`/order/${record.key}`}>{text}</Title>,
  },
  {
    title: "注文者",
    dataIndex: "name",
    width: 120,
    render: (text: string) => <Info>{text}</Info>,
  },
  {
    title: "注文日時",
    dataIndex: "date",
    ellipsis: true,
    render: (text: string) => <Info>{text}</Info>,
  },
  {
    title: "合計金額",
    dataIndex: "total",
    width: 100,
    render: (text: string) => <Info>{text}</Info>,
  },
  {
    title: "支払い状況",
    dataIndex: "paid",
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
