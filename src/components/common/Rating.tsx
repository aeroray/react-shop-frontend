import { FC } from "react"
import { Rate } from "antd"
import styled from "@emotion/styled"

const desc = ["terrible", "bad", "normal", "good", "wonderful"]

interface RatingProps {
  rating: number
  numReviews: number
}

export const Rating: FC<RatingProps> = ({ rating, numReviews }) => {
  return (
    <>
      <Rate tooltips={desc} defaultValue={rating} disabled allowHalf />
      <Review>({numReviews})</Review>
    </>
  )
}

const Review = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  margin-left: 1rem;
`
