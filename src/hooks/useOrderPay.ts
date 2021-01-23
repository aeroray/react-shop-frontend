import axios from "axios"
import { message } from "antd"
import { useState } from "react"

export default function useOrderPay() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/orders`

  const updateOrderToPaid = async (id: string, paymentResult: any, token: string) => {
    reset()
    try {
      await axios.put(`${BASE_URL}/${id}/pay`, paymentResult, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
      setSuccess(true)
      message.success("成功しました。")
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

  return { updateOrderToPaid, paySuccess: success, payLoading: loading }
}
