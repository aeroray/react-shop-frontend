import { FC } from "react"
import { Alert, Tag } from "antd"
import TextLoop from "react-text-loop"

export const MessageLoop: FC = () => {
  return (
    <Alert
      banner
      closable
      type='info'
      style={{ width: "100%" }}
      message={
        <TextLoop mask>
          <div>
            <Tag color='green'>aeroray</Tag>ようこそ～スマイルショップへ
          </div>
          <div>
            <Tag color='green'>aeroray</Tag>テストアカウントと決済アカウントを使っていろいろな機能を試してみろう！
          </div>
          <div>
            <Tag color='volcano'>テストアカウント</Tag>メールアドレス：test@qq.com　パスワード：123456
          </div>
          <div>
            <Tag color='volcano'>決済アカウント</Tag>メールアドレス：yamada@qq.com　パスワード：12345678
          </div>
        </TextLoop>
      }
    />
  )
}
