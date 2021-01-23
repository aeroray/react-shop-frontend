import { Dispatch, FC, useEffect, useRef } from "react"
import { Button, Form, Input, Modal, Switch } from "antd"
import { CheckOutlined, CloseOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"

interface UpdateUserModalProps {
  userInfo: any
  selectedUser: any
  updateLoading: boolean
  visible: boolean
  setVisible: Dispatch<React.SetStateAction<boolean>>
  updateUser: (id: string, token: string, values: any) => Promise<void>
}

export const UpdateUserModal: FC<UpdateUserModalProps> = (props) => {
  const { visible, setVisible, userInfo, selectedUser, updateUser, updateLoading } = props
  const { id, name, email, isAdmin } = selectedUser
  const formRef = useRef<any>()

  useEffect(() => {
    if (name && formRef.current) {
      formRef.current.setFieldsValue({ name, email, isAdmin })
    }
  }, [name, email, isAdmin])

  const onFinish = async (values: any) => await updateUser(id, userInfo.token, values)

  return (
    <>
      <Modal
        title={<span style={{ fontSize: "2rem" }}>プロファイルを編集する</span>}
        visible={visible}
        maskClosable={false}
        closable={false}
        footer={<Button onClick={() => setVisible(false)}>キャンセル</Button>}
      >
        <Form ref={formRef} onFinish={onFinish} validateTrigger='onBlur'>
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
          <Form.Item
            name='isAdmin'
            valuePropName='checked'
            colon={false}
            label={
              <span style={{ fontSize: "1.8rem" }}>
                {userInfo._id === id ? "自分の権限が編集できない" : "管理者権限を与える？"}{" "}
              </span>
            }
          >
            <Switch
              disabled={userInfo._id === id}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button size='large' loading={updateLoading} type='primary' htmlType='submit' style={{ width: "100%" }}>
              更新する
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
