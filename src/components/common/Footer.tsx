import { FC } from "react"
import { Layout } from "antd"
import styled from "@emotion/styled"

export const Footer: FC = () => {
  return (
    <Container>
      Made with ❤ by{" "}
      <a href='https://github.com/aeroray' target='_blank' rel='noreferrer'>
        aeroray
      </a>
    </Container>
  )
}

const Container = styled(Layout.Footer)`
  text-align: center;
  font-size: 1.6rem;
  background-color: #333;
  color: white;
`
