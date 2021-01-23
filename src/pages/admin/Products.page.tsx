import { Helmet } from "react-helmet"
import { FC, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Divider, Empty, Popconfirm, Table } from "antd"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"

import { RootState } from "store"
import { Spinner, UpdateProductModal, CreateProductModal } from "components"

import useDeleteProduct from "hooks/useDeleteProduct"
import useUpdateProduct from "hooks/useUpdateProduct"
import useCreateProduct from "hooks/useCreateProduct"
import { fetchProductList } from "store/product/productList.slice"

const Products: FC = () => {
  const { deleteProduct, deleteLoading, deleteSuccess } = useDeleteProduct()
  const { updateLoading, updateSuccess, updateProduct, visible, setVisible } = useUpdateProduct()
  const {
    createLoading,
    createSuccess,
    createProduct,
    createProductVisible,
    setCreateProductVisible,
  } = useCreateProduct()
  const [selectedProduct, setSelectedProduct] = useState({})
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const history = useHistory()
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { loading, error, products, count } = useSelector((state: RootState) => state.productList)

  const dataSource = products.map((product) => ({
    key: product._id,
    id: product._id,
    name: product.name,
    price: product.price,
    brand: product.brand,
    category: product.category,
    image: product.image,
    description: product.description,
    countInStock: product.countInStock,
  }))

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      ellipsis: true,
      render: (text: string) => <Info>{text}</Info>,
    },
    {
      title: "商品名",
      dataIndex: "name",
      ellipsis: true,
      render: (text: string, record: any) => <Title to={`/product/${record.id}`}>{text}</Title>,
    },
    {
      title: "価格",
      dataIndex: "price",
      width: 120,
      render: (text: string) => <Info>${text}</Info>,
    },
    {
      title: "カテゴリー",
      dataIndex: "category",
      ellipsis: true,
      render: (text: string) => <Info>{text}</Info>,
    },
    {
      title: "在庫数",
      dataIndex: "countInStock",
      width: 100,
      render: (text: string) => <Info>{text}</Info>,
    },
    {
      title: "編集",
      key: "edit",
      width: 100,
      render: (record: any) => (
        <Button
          shape='round'
          icon={<EditOutlined />}
          onClick={() => {
            setVisible(true)
            setSelectedProduct(record)
          }}
        />
      ),
    },
    {
      title: "削除",
      key: "delete",
      width: 100,
      render: (record: any) => (
        <Popconfirm
          title='本当にこの商品を削除しますか？'
          onConfirm={async () => await deleteProduct(record.id, userInfo.token)}
          okText='はい'
          cancelText='いいえ'
          placement='topRight'
        >
          <Button danger shape='round' loading={deleteLoading} icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ]

  // 一旦更新或者删除用户成功则重新获取所有用户
  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push("/")
    }
    dispatch(fetchProductList("", page))
  }, [userInfo, history, dispatch, deleteSuccess, updateSuccess, createSuccess, page])

  if (loading) return <Spinner />
  if (error) return <Alert message='エラー' description={error} type='error' showIcon closable />
  if (products.length === 0) return <Empty />

  return (
    <>
      <Helmet>
        <title>スマイルショップ | 商品一覧</title>
      </Helmet>
      <Divider orientation='left' style={{ fontSize: "2rem" }}>
        商品一覧
      </Divider>
      <Button
        size='large'
        type='primary'
        icon={<PlusOutlined />}
        onClick={() => setCreateProductVisible(true)}
        style={{ marginBottom: "2rem" }}
      >
        新商品を追加する
      </Button>
      <UpdateProductModal
        userInfo={userInfo}
        visible={visible}
        setVisible={setVisible}
        selectedProduct={selectedProduct}
        updateLoading={updateLoading}
        updateProduct={updateProduct}
      />
      <CreateProductModal
        userInfo={userInfo}
        createProduct={createProduct}
        createLoading={createLoading}
        createProductVisible={createProductVisible}
        setCreateProductVisible={setCreateProductVisible}
      />
      <StyledTable
        loading={loading}
        scroll={{ x: 768 }}
        pagination={{ pageSize: 8, total: count, current: page, onChange: (page) => setPage(page) }}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  )
}

export default Products

const StyledTable = styled(Table)`
  th {
    font-size: 1.6rem;
  }
`

const Info = styled.span`
  font-size: 1.8rem;
`

const Title = styled(Link)`
  color: currentColor;
  font-size: 2rem;
  &:hover {
    color: currentColor;
    text-decoration: underline;
  }
`
