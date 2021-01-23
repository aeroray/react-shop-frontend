import { Result, Button } from "antd"
import { Helmet } from "react-helmet"
import { useHistory } from "react-router-dom"

export default function NotFound() {
  const history = useHistory()

  return (
    <>
      <Helmet>
        <title>スマイルショップ | 404</title>
      </Helmet>
      <Result
        status='404'
        title='404'
        subTitle='お探しのページが見つかりませんでした。'
        extra={
          <Button type='primary' onClick={() => history.push("/")}>
            ホームページへ
          </Button>
        }
      />
    </>
  )
}
