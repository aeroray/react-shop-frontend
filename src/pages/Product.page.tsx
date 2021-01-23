import { Helmet } from "react-helmet"
import { FC, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import {
  Col,
  PageHeader,
  Row,
  Image,
  Typography,
  Divider,
  Button,
  InputNumber,
  Alert,
  message,
  Empty,
  Rate,
  Form,
  Input,
  Comment,
} from "antd"
import styled from "@emotion/styled"

import { RootState } from "store"
import { Price, Rating, Spinner } from "components"
import { fetchProductDetail } from "store/product/productDetail.slice"

import useCreateReview from "hooks/useCreateReview"

const Product: FC = () => {
  const history = useHistory()
  const qtyRef = useRef<any>()
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { loading, error, product } = useSelector((state: RootState) => state.productDetail)
  const { createLoading, createSuccess, createReview } = useCreateReview()

  useEffect(() => {
    dispatch(fetchProductDetail(id))
  }, [dispatch, id, createSuccess])

  const handleCLick = () => {
    const qty = qtyRef.current.state.value
    message.success("カートに入れました！")
    history.push(`/cart/${id}?qty=${qty}`)
  }

  if (loading) return <Spinner />
  if (error) return <Alert message='エラー' description={error} type='error' showIcon closable />

  const onFinish = (values: { rating: number; comment: string }) => {
    createReview(userInfo.token, id, values)
  }

  return (
    <>
      <Helmet>
        <title>{`スマイルショップ | ${product.name}`}</title>
      </Helmet>
      <StyledHeader onBack={() => history.push("/")} title='ホームページ' />
      <Row gutter={[32, 32]}>
        <Col sm={24} md={12}>
          <Image
            src={product.image}
            alt={product.name}
            loading='lazy'
            width='100%'
            height='100%'
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col sm={24} md={12} style={{ overflow: "auto" }}>
          <Typography.Title level={2}>{product.name}</Typography.Title>
          <Typography.Title level={5}>{product.brand}</Typography.Title>
          <Divider />
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Divider />
          <Price price={product.price} />
          <Divider />
          <Count>
            <div>
              <span>数量：</span>
              <InputNumber ref={qtyRef} min={1} max={product.countInStock} defaultValue={1} />
            </div>
            <Button type='primary' disabled={product.countInStock === 0} onClick={handleCLick}>
              カートに入れる
            </Button>
          </Count>
          <Divider />
          <Description ellipsis={{ rows: 3, expandable: true }}>{product.description}</Description>
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: "2rem" }}>
        <Col sm={24} md={12}>
          {product.reviews?.length === 0 ? (
            <Empty description={<span>この商品に関するレビューはまだありません。</span>} />
          ) : (
            product.reviews?.map((r: any) => (
              <Comment
                key={r._id}
                author={<h3 style={{ color: "#333" }}>{r.name}</h3>}
                content={
                  <>
                    <Rate disabled defaultValue={r.rating} style={{ margin: "-1rem 0 1rem 0" }} />
                    <p style={{ fontSize: "1.4rem" }}>{r.comment}</p>
                  </>
                }
                datetime={<span>{new Date(r.createdAt).toLocaleString("ja-JP")}</span>}
              />
            ))
          )}
        </Col>
        <Col sm={24} md={12}>
          {userInfo?._id ? (
            <Form layout='vertical' onFinish={onFinish}>
              <Form.Item name='rating' rules={[{ required: true, message: "評価が必須です。" }]}>
                <Rate allowHalf />
              </Form.Item>
              <Form.Item name='comment' rules={[{ required: true, message: "レビューが必須です。" }]}>
                <Input.TextArea
                  autoSize={{ minRows: 6 }}
                  allowClear
                  showCount
                  placeholder='ここに商品のレビューを書いてください。'
                />
              </Form.Item>
              <Button loading={createLoading} htmlType='submit' type='primary' size='large' style={{ width: "100%" }}>
                送信する
              </Button>
            </Form>
          ) : (
            <Alert
              showIcon
              message='商品のレビューを投稿するにはログインしてください。'
              type='info'
              action={
                <Button size='small' type='primary' onClick={() => history.push("/login")}>
                  ログイン
                </Button>
              }
            />
          )}
        </Col>
      </Row>
    </>
  )
}

export default Product

const StyledHeader = styled(PageHeader)`
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 2rem;
`

const Description = styled(Typography.Paragraph)`
  font-size: 1.6rem;
  letter-spacing: 1px;
`

const Count = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2rem;
  span {
    font-size: 1.6rem;
  }
`
