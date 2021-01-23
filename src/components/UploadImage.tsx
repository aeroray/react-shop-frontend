import { FC, Dispatch } from "react"
import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"

interface UploadImageProps {
  imageURL: string
  setImageURL: Dispatch<React.SetStateAction<string>>
}

export const UploadImage: FC<UploadImageProps> = ({ imageURL, setImageURL }) => {
  return (
    <Upload
      accept='image/*'
      data={{ upload_preset: "xh4mzky6" }}
      action='https://api.cloudinary.com/v1_1/do8o7e06b/image/upload'
      onChange={({ fileList }) => {
        const url = fileList[0]?.response?.secure_url
        if (url) setImageURL(url)
      }}
      maxCount={1}
      onRemove={() => setImageURL("")}
      listType='picture'
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  )
}
