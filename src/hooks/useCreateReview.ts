import axios from "axios"
import { message } from "antd"
import { useState } from "react"

export default function useCreateReview() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/products`

  const createReview = async (token: string, id: string, review: any) => {
    reset()
    try {
      const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      await axios.post(`${BASE_URL}/${id}/review`, review, config)
      setSuccess(true)
      message.success("レビューしました。")
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

  return { createReview, createLoading: loading, createSuccess: success }
}
