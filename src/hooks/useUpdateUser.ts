import axios from "axios"
import { message } from "antd"
import { useState } from "react"

export default function useUpdateUser() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [visible, setVisible] = useState(false)

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/users`

  const updateUser = async (id: string, token: string, values: any) => {
    reset()
    try {
      await axios.put(`${BASE_URL}/${id}`, values, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
      setSuccess(true)
      setVisible(false)
      message.success("更新されました。")
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

  return { updateLoading: loading, updateSuccess: success, updateUser, visible, setVisible }
}
