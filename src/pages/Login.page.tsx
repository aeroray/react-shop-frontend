import { FC, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import { Form, Input, Button, Card, Alert } from "antd"
import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { Link, useHistory, useLocation } from "react-router-dom"
import styled from "@emotion/styled"

import { RootState } from "store"
import { login } from "store/user/userAuth.slice"

const Login: FC = () => {
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

  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values
    dispatch(login(email, password))
  }

  return (
    <>
      <Helmet>
        <title>スマイルショップ | ログイン</title>
      </Helmet>
      {error && <Alert message='エラー' description={error} type='error' showIcon closable />}
      <Container title='ログイン'>
        <Form onFinish={onFinish} validateTrigger='onBlur' style={{ padding: "" }}>
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
            <Button
              loading={loading}
              disabled={loading}
              size='large'
              type='primary'
              htmlType='submit'
              style={{ width: "100%" }}
            >
              ログイン
            </Button>
            <p style={{ marginTop: "1rem", textAlign: "center" }}>
              アカウントをお持ちでないですか？
              <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>会員登録</Link>
            </p>
          </Form.Item>
        </Form>
      </Container>
    </>
  )
}

export default Login

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
