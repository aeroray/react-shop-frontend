import { FC, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import { Form, Input, Button, Card, Alert } from "antd"
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons"
import { Link, useHistory, useLocation } from "react-router-dom"
import styled from "@emotion/styled"

import { RootState } from "store"
import { register } from "store/user/userAuth.slice"

const Register: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading, error, userInfo } = useSelector((state: RootState) => state.auth)

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const onFinish = (values: { name: string; email: string; password: string }) => {
    const { name, email, password } = values
    dispatch(register(name, email, password))
  }

  return (
    <>
      <Helmet>
        <title>スマイルショップ | 会員登録</title>
      </Helmet>
      {error && <Alert message='エラー' description={error} type='error' showIcon closable />}
      <Container title='会員登録'>
        <Form onFinish={onFinish} validateTrigger='onBlur'>
          <Form.Item name='name' rules={[{ required: true, message: "ユーザー名が必須です。" }]}>
            <Input size='large' prefix={<UserOutlined />} type='text' placeholder='ユーザー名' />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: "メールアドレスが必須です。" },
              { type: "email", message: "正しいメールアドレスを入力してください。" },
            ]}
          >
            <Input size='large' prefix={<MailOutlined />} type='email' placeholder='メールアドレス' />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: "パスワードが必須です。" }]}>
            <Input size='large' prefix={<LockOutlined />} type='password' placeholder='パスワード' />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} size='large' type='primary' htmlType='submit' style={{ width: "100%" }}>
              登録
            </Button>
            <p style={{ marginTop: "1rem", textAlign: "center" }}>
              既にアカウントをお持ちですか？
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>ログイン</Link>
            </p>
          </Form.Item>
        </Form>
      </Container>
    </>
  )
}

export default Register

const Container = styled(Card)`
  width: 40rem;
  margin: 0 auto;
  margin-top: 4rem;
  .ant-card-head {
    font-size: 3rem;
    font-weight: 500;
    text-align: center;
  }
`
