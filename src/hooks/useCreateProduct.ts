import axios from "axios"
import { message } from "antd"
import { useState } from "react"

export default function useCreateProduct() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [visible, setVisible] = useState(false)

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/products`

  const createProduct = async (token: string, values: any) => {
    reset()
    try {
      await axios.post(BASE_URL, values, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
      setSuccess(true)
      setVisible(false)
      message.success("追加しました。")
    } catch (error) {
      message.error(error.response && error.response.data.message ? error.response.data.message : error.message)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(true)
    setSuccess(false)
  }

  return {
    createLoading: loading,
    createSuccess: success,
    createProduct,
    createProductVisible: visible,
    setCreateProductVisible: setVisible,
  }
}
