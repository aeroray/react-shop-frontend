import { FC, useEffect, useState } from "react"
import { Button, Carousel, Spin, Typography } from "antd"
import { Link, useHistory } from "react-router-dom"
import styled from "@emotion/styled"

import useCarousel from "hooks/useCarousel"
import { LoadingOutlined } from "@ant-design/icons"

interface Product {
  _id: string
  name: string
  image: string
  price: number
}

export const ProductCarousel: FC = () => {
  const history = useHistory()
  const { topRatedProducts, loading } = useCarousel()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const getWindowWidth = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", getWindowWidth)
    return () => window.removeEventListener("resize", getWindowWidth)
  }, [])

  if (loading)
    return (
      <SkeletonBox>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "white" }} spin />} />
      </SkeletonBox>
    )

  return (
    <StyledCarousel autoplay draggable>
      {topRatedProducts.map((product: Product) => (
        <div key={product._id}>
          <Container>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} />
            </Link>
            {windowWidth > 850 && (
              <Details>
                <Typography.Title level={2} style={{ color: "white" }}>
                  {product.name}
                </Typography.Title>
                <Typography.Title level={3} style={{ marginTop: "2rem", color: "white" }}>
                  ${product.price}
                </Typography.Title>
                <Button
                  ghost
                  size='large'
                  style={{ marginTop: "2rem", width: 200 }}
                  onClick={() => history.push(`/product/${product._id}`)}
                >
                  今すぐ買う
                </Button>
              </Details>
            )}
          </Container>
        </div>
      ))}
    </StyledCarousel>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 4rem;
`

const StyledCarousel = styled(Carousel)`
  position: relative;
  padding: 5rem 0;
  height: calc(10rem + 400px);
  background-color: #333;
`

const Image = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  line-height: 400px;
  border-radius: 999px;
  &:hover {
    filter: contrast(90%);
  }
`

const Details = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
`

const SkeletonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
  height: calc(10rem + 400px);
  background-color: #333;
`
