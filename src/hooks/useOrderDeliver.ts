import axios from "axios"
import { message } from "antd"
import { useState } from "react"

export default function useOrderDeliver() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/orders`

  const updateOrderToDelivered = async (id: string, token: string) => {
    reset()
    try {
      await axios.put(
        `${BASE_URL}/${id}/deliver`,
        {},
        {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }
      )
      setSuccess(true)
      message.success("発送しました。")
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

  return { updateLoading: loading, updateSuccess: success, updateOrderToDelivered }
}
