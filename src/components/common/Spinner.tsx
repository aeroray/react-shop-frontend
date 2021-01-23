import { FC } from "react"
import { Spin } from "antd"
import styled from "@emotion/styled"

export const Spinner: FC = () => {
  return (
    <Container>
      <Spin size='large' tip='読み込み中...' />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
