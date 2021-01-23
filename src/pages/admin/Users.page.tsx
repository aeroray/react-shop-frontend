import { Helmet } from "react-helmet"
import { FC, useEffect, useState } from "react"
import { Alert, Button, Divider, Empty, Popconfirm, Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { CheckCircleTwoTone, CloseCircleTwoTone, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import styled from "@emotion/styled"

import { RootState } from "store"
import { Spinner, UpdateUserModal } from "components"
import { getAllUsers } from "store/user/userList.slice"

import useDeleteUser from "hooks/useDeleteUser"
import useUpdateUser from "hooks/useUpdateUser"

const Users: FC = () => {
  const { deleteUser, deleteLoading, deleteSuccess } = useDeleteUser()
  const { updateLoading, updateSuccess, updateUser, visible, setVisible } = useUpdateUser()

  const [selectedUser, setSelectedUser] = useState({})

  const dispatch = useDispatch()
  const history = useHistory()
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const { loading, error, users } = useSelector((state: RootState) => state.userList)

  const dataSource = users.map((user) => ({
    key: user._id,
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  }))

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (text: string) => <Info>{text}</Info>,
    },
    {
      title: "名前",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (text: string) => <Info>{text}</Info>,
    },
    {
      title: "メールアドレス",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      render: (text: string) => <Info>{text}</Info>,
    },
    {
      title: "管理者権限",
      dataIndex: "isAdmin",
      key: "isAdmin",
      width: 120,
      render: (isAdmin: boolean) => (
        <Info>
          {isAdmin ? <CheckCircleTwoTone twoToneColor='#52c41a' /> : <CloseCircleTwoTone twoToneColor='#eb2f96' />}
        </Info>
      ),
    },
    {
      title: "編集",
      key: "edit",
      width: 100,
      render: (record: any) => (
        <Button
          shape='round'
          icon={<EditOutlined />}
          onClick={() => {
            const { id, name, isAdmin, email } = record
            setVisible(true)
            setSelectedUser({ id, name, email, isAdmin })
          }}
        />
      ),
    },
    {
      title: "削除",
      key: "delete",
      width: 100,
      render: (record: any) => (
        <Popconfirm
          title='本当にこのユーザーを削除しますか？'
          disabled={record.id === userInfo._id}
          onConfirm={async () => await deleteUser(record.id, userInfo.token)}
          okText='はい'
          cancelText='いいえ'
          placement='topRight'
        >
          <Button
            disabled={record.id === userInfo._id}
            danger
            shape='round'
            loading={deleteLoading}
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ),
    },
  ]

  // 一旦更新或者删除用户成功则重新获取所有用户
  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push("/")
    }
    dispatch(getAllUsers())
  }, [userInfo, history, dispatch, deleteSuccess, updateSuccess])

  if (loading) return <Spinner />
  if (error) return <Alert message='エラー' description={error} type='error' showIcon closable />
  if (users.length === 0) return <Empty />

  return (
    <>
      <Helmet>
        <title>スマイルショップ | ユーザー一覧</title>
      </Helmet>
      <Divider orientation='left' style={{ fontSize: "2rem" }}>
        ユーザー一覧
      </Divider>
      <UpdateUserModal
        visible={visible}
        userInfo={userInfo}
        updateUser={updateUser}
        updateLoading={updateLoading}
        setVisible={setVisible}
        selectedUser={selectedUser}
      />
      <StyledTable pagination={{ pageSize: 8 }} columns={columns} dataSource={dataSource} />
    </>
  )
}

export default Users

const StyledTable = styled(Table)`
  th {
    font-size: 1.6rem;
  }
`

const Info = styled.span`
  font-size: 1.8rem;
`
