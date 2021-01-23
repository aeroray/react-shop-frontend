import axios from "axios"
import { useEffect, useState } from "react"

export default function useCarousel() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/products`

  useEffect(() => {
    setIsMounted(true)
    const getTopRatedProducts = async () => {
      setLoading(true)
      const { data } = await axios.get(`${BASE_URL}/top`)
      if (isMounted) {
        setProducts(data)
        setLoading(false)
      }
    }
    getTopRatedProducts()
  }, [BASE_URL, isMounted])

  return { topRatedProducts: products, loading }
}
