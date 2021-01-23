import { FC } from "react"
import { Steps } from "antd"
import styled from "@emotion/styled"

const { Step } = Steps

interface StepNavProps {
  step: number
}

export const StepNav: FC<StepNavProps> = ({ step }) => {
  return (
    <Container>
      <StyledSteps current={step}>
        <Step title='アドレス' />
        <Step title='お支払い方法' />
        <Step title='注文内容' />
      </StyledSteps>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 2rem;
  text-align: center;
`

const StyledSteps = styled(Steps)`
  max-width: 50%;
  min-width: 42rem;
  margin: 0 auto;
  font-weight: 600;
`
