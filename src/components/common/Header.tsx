import { FC } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Layout, Typography, Input, Badge, Button, Dropdown, Menu } from "antd"
import {
  SmileTwoTone,
  ShoppingCartOutlined,
  UserOutlined,
  DownOutlined,
  PoweroffOutlined,
  ProfileOutlined,
  ShopOutlined,
} from "@ant-design/icons"
import styled from "@emotion/styled"

import { RootState } from "store"
import { emptyCart } from "store/cart/cart.slice"
import { logout } from "store/user/userAuth.slice"
import { resetUserList } from "store/user/userList.slice"

export const Header: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { loading } = useSelector((state: RootState) => state.productList)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(emptyCart())
    dispatch(resetUserList())
  }

  const onSearch = (value: string) => {
    const keyword = value.trim()
    if (keyword) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/")
    }
  }

  return (
    <Container>
      <Logo onClick={() => history.push("/")} />
      <Search placeholder='商品を検索' onSearch={onSearch} loading={loading} allowClear />
      <Link onClick={() => history.push("/cart")}>
        <CartIcon count={cartItems.reduce((acc, item) => acc + item.qty, 0)} size='small'>
          <ShoppingCartOutlined />
        </CartIcon>
      </Link>
      {userInfo ? (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key='1' icon={<UserOutlined />} onClick={() => history.push("/profile")}>
                プロファイル
              </Menu.Item>
              <Menu.Item key='2' icon={<PoweroffOutlined />} onClick={handleLogout}>
                ログアウト
              </Menu.Item>
            </Menu>
          }
        >
          <Button>
            {userInfo.name} <DownOutlined />
          </Button>
        </Dropdown>
      ) : (
        <Button onClick={() => history.push("/login")}>
          <UserOutlined />
          ログイン
        </Button>
      )}
      {userInfo?.isAdmin && (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key='1' icon={<UserOutlined />} onClick={() => history.push("/admin/users")}>
                ユーザー管理
              </Menu.Item>
              <Menu.Item key='2' icon={<ShopOutlined />} onClick={() => history.push("/admin/products")}>
                商品管理
              </Menu.Item>
              <Menu.Item key='3' icon={<ProfileOutlined />} onClick={() => history.push("/admin/orders")}>
                注文管理
              </Menu.Item>
            </Menu>
          }
        >
          <Button type='primary' danger>
            管理者 <DownOutlined />
          </Button>
        </Dropdown>
      )}
    </Container>
  )
}

const Container = styled(Layout.Header)`
  display: flex;
  column-gap: 2rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(18, 18, 18, 0.1);
`

const Logo = styled(SmileTwoTone)`
  font-size: 4rem;
`

const Search = styled(Input.Search)`
  width: 20rem;
`

const Link = styled(Typography.Link)`
  font-size: 2rem;
  margin-left: auto;
`

const CartIcon = styled(Badge)`
  font-size: 2rem;
`
