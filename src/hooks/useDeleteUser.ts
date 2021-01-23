import { message } from "antd"
import axios from "axios"
import { useState } from "react"

export default function useDeleteUser() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/users`

  const deleteUser = async (id: string, token: string) => {
    reset()
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
      setSuccess(true)
      message.success("削除しました。")
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

  return { deleteLoading: loading, deleteSuccess: success, deleteUser }
}
