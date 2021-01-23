import { Helmet } from "react-helmet"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { Col, Row, Divider, Alert, Empty, Button, Pagination } from "antd"

import { RootState } from "store"
import { Product, ProductCarousel, Spinner } from "components"
import { fetchProductList } from "store/product/productList.slice"

const Home: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { keyword } = useParams<{ keyword?: string }>()
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchProductList(keyword, page))
  }, [dispatch, keyword, page])

  const { error, loading, products, count } = useSelector((state: RootState) => state.productList)

  if (loading) return <Spinner />
  if (error) return <Alert message='エラー' description={error} type='error' showIcon closable />

  return (
    <>
      <Helmet>
        <title>スマイルショップ | ようこそ！</title>
      </Helmet>
      {!keyword && <ProductCarousel />}
      <Divider orientation='left' style={{ fontSize: "2rem" }}>
        {keyword ? `「${keyword}」の検索結果` : "おすすめ"}
      </Divider>
      {products.length === 0 ? (
        <Empty description='お探しの商品が見つかりませんでした。'>
          <Button type='primary' onClick={() => history.push("/")}>
            ホームページへ
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col sm={24} md={12} lg={8} xl={6} xxl={4} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
      <Divider />
      <Pagination
        total={count}
        pageSize={8}
        current={page}
        style={{ textAlign: "center" }}
        onChange={(page) => setPage(page)}
      />
    </>
  )
}

export default Home
