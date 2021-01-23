import { Dispatch, FC, useEffect, useRef, useState } from "react"
import { Button, Form, Input, Modal } from "antd"

import { UploadImage } from "./UploadImage"

interface UpdateProductModalProps {
  userInfo: any
  selectedProduct: any
  updateLoading: boolean
  visible: boolean
  setVisible: Dispatch<React.SetStateAction<boolean>>
  updateProduct: (id: string, token: string, values: any) => Promise<void>
}

export const UpdateProductModal: FC<UpdateProductModalProps> = (props) => {
  const formRef = useRef<any>()
  const [imageURL, setImageURL] = useState("")
  const { visible, setVisible, userInfo, selectedProduct, updateProduct, updateLoading } = props

  useEffect(() => {
    const { id, name, price, brand, category, image, description, countInStock } = selectedProduct
    if (id && formRef.current) {
      formRef.current.setFieldsValue({ name, price, brand, category, image, description, countInStock })
    }
  }, [selectedProduct])

  const onFinish = async (values: any) => {
    const data = { ...values, image: imageURL || values.image }
    await updateProduct(selectedProduct.id, userInfo.token, data)
  }

  return (
    <>
      <Modal
        title={<span style={{ fontSize: "2rem" }}>商品を編集する</span>}
        visible={visible}
        maskClosable={false}
        closable={false}
        footer={<Button onClick={() => setVisible(false)}>キャンセル</Button>}
      >
        <Form ref={formRef} onFinish={onFinish} validateTrigger='onBlur' layout='vertical'>
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
            <Input allowClear disabled={!!imageURL} size='large' type='text' />
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
            <Button size='large' loading={updateLoading} type='primary' htmlType='submit' style={{ width: "100%" }}>
              更新する
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
