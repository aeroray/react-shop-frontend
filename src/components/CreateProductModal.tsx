import { Dispatch, FC, useEffect, useRef, useState } from "react"
import { Button, Form, Input, Modal } from "antd"

import { UploadImage } from "./UploadImage"

interface CreateProductModalProps {
  userInfo: any
  createLoading: boolean
  createProductVisible: boolean
  setCreateProductVisible: Dispatch<React.SetStateAction<boolean>>
  createProduct: (token: string, values: any) => Promise<void>
}

export const CreateProductModal: FC<CreateProductModalProps> = (props) => {
  const formRef = useRef<any>()
  const [imageURL, setImageURL] = useState("")
  const { userInfo, setCreateProductVisible, createProductVisible, createProduct, createLoading } = props

  useEffect(() => {
    if (createProductVisible && formRef.current) {
      formRef.current.setFieldsValue({
        image: "https://res.cloudinary.com/do8o7e06b/image/upload/v1611321005/sample_rhqq6s.jpg",
      })
    }
  }, [createProductVisible])

  const onFinish = async (values: any) => {
    const data = { ...values, image: imageURL || values.image }
    await createProduct(userInfo.token, data)
  }

  return (
    <>
      <Modal
        title={<span style={{ fontSize: "2rem" }}>商品を追加する</span>}
        visible={createProductVisible}
        maskClosable={false}
        closable={false}
        footer={<Button onClick={() => setCreateProductVisible(false)}>キャンセル</Button>}
      >
        <Form onFinish={onFinish} ref={formRef} validateTrigger='onBlur' layout='vertical'>
          <Form.Item label='商品名' name='name' rules={[{ required: true, message: "商品名が必須です。" }]}>
            <Input size='large' type='text' />
          </Form.Item>
          <Form.Item label='カテゴリー' name='category' rules={[{ required: true, message: "カテゴリーが必須です。" }]}>
            <Input size='large' type='text' />
          </Form.Item>
          <Form.Item
            label='画像のURLを入力するか、又は画像をアップロードする'
            name='image'
            rules={[{ required: true, message: "画像が必須です。" }]}
          >
            <Input allowClear disabled={!!imageURL} size='large' type='text' placeholder='https://...' />
          </Form.Item>
          <Form.Item>
            <UploadImage imageURL={imageURL} setImageURL={setImageURL} />
          </Form.Item>
          <Form.Item label='ブランド' name='brand' rules={[{ required: true, message: "ブランドが必須です。" }]}>
            <Input size='large' type='text' />
          </Form.Item>
          <Form.Item label='価格' name='price' rules={[{ required: true, message: "価格が必須です。" }]}>
            <Input size='large' type='number' min={0} prefix='$' suffix='USD' />
          </Form.Item>
          <Form.Item label='在庫数' name='countInStock' rules={[{ required: true, message: "在庫数が必須です。" }]}>
            <Input size='large' type='number' min={0} />
          </Form.Item>
          <Form.Item label='詳細情報' name='description' rules={[{ required: true, message: "詳細が必須です。" }]}>
            <Input.TextArea size='large' showCount allowClear autoSize />
          </Form.Item>
          <Form.Item>
            <Button size='large' loading={createLoading} type='primary' htmlType='submit' style={{ width: "100%" }}>
              追加する
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
