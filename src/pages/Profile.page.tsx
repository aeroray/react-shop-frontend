import { Helmet } from "react-helmet"
import { useHistory } from "react-router-dom"
import { FC, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"
import { Divider, Row, Col, Card, Typography, Form, Input, Button, Alert } from "antd"

import { RootState } from "store"
import { OrderTable } from "components"
import { updateProfile } from "store/user/userAuth.slice"
import { getMyOrders } from "store/order/myOrders.slice"

const Profile: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const formRef = useRef<any>()
  const [success, setSuccess] = useState(false)

  const { error, loading, userInfo } = useSelector((state: RootState) => state.auth)
  const { orders } = useSelector((state: RootState) => state.myOrders)

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      formRef.current.setFieldsValue({ name: userInfo.name, email: userInfo.email, password: "" })
      dispatch(getMyOrders())
    }
  }, [history, userInfo, dispatch])

  // 重置成功信息
  useEffect(() => {
    setSuccess(false)
  }, [])

  const onFinish = (values: { name: string; email: string; password: string }) => {
    const { name, email, password } = values
    dispatch(updateProfile(name, email, password))
    setSuccess(true)
  }

  return (
    <>
      <Helmet>
        <title>スマイルショップ | プロファイル</title>
      </Helmet>
      <Divider orientation='left' style={{ fontSize: "2rem" }}>
        {userInfo?.name}
      </Divider>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <OrderTable orders={orders} />
        </Col>
        <Col xs={24} lg={8}>
          {/* // 如果没有处于加载中或发生错误时将显示成功信息 */}
          {!loading &&
            (error ? (
              <Alert message='エラー' description={error} type='error' showIcon closable />
            ) : (
              success && <Alert message='成功' description='更新に成功しました！' type='success' showIcon closable />
            ))}
          <Card>
            <Typography.Title style={{ textAlign: "center" }} level={4}>
              プロファイルを編集
            </Typography.Title>
            <Divider />
            <Form ref={formRef} onFinish={onFinish} validateTrigger='onBlur'>
              <Form.Item name='name' rules={[{ required: true, message: "ユーザー名が必須です。" }]}>
                <Input size='large' prefix={<UserOutlined />} type='text' placeholder='新しいユーザー名' />
              </Form.Item>
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: "メールアドレスが必須です。" },
                  { type: "email", message: "正しいメールアドレスを入力してください。" },
                ]}
              >
                <Input size='large' prefix={<MailOutlined />} type='email' placeholder='新しいメールアドレス' />
              </Form.Item>
              <Form.Item
                validateTrigger='onChange'
                name='password'
                rules={[{ required: true, message: "パスワードが必須です。" }]}
              >
                <Input
                  size='large'
                  autoComplete='off'
                  prefix={<LockOutlined />}
                  type='password'
                  placeholder='本人確認用のパスワード'
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  size='large'
                  danger
                  type='primary'
                  htmlType='submit'
                  style={{ width: "100%" }}
                >
                  更新する
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Profile
