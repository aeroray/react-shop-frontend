import axios from "axios"
import { message } from "antd"
import { useState } from "react"

export default function useCreateOrder() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState("")

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/orders`

  const createOrder = async (token: string, order: any) => {
    reset()
    try {
      const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      const { data } = await axios.post(BASE_URL, order, config)
      setOrderId(data.orderId)
      setSuccess(true)
      message.success("注文は完了しました。")
    } catch (error) {
      message.error(error.response && error.response.data.message ? error.response.data.message : error.message)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setOrderId("")
    setLoading(true)
    setSuccess(false)
  }

  return { orderId, createOrder, createLoading: loading, createSuccess: success }
}
