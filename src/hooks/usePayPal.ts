import axios from "axios"
import { useEffect, useState } from "react"

export default function usePayPal() {
  const [sdkReady, setSdkReady] = useState(false)

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/config/paypal`

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(BASE_URL)
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => setSdkReady(true)
      document.body.appendChild(script)
    }
    addPayPalScript()
  }, [BASE_URL])

  return { sdkReady }
}
