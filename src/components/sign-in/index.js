import { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import Form, { Email, Password, Submit } from '../forms'
import { signIn, clearAuthorizationErrors } from '../../store/store'
import { SIGNUP } from '../../store/routing-paths'

function SignIn() {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(clearAuthorizationErrors())
  }, [])

  const { handleSubmit, control } = useForm({ mode: 'onBlur' })

  const error = useSelector((state) => state.authorization.errors)
  const isLoading = useSelector((state) => state.authorization.loading)
  const isAuthorize = useSelector((state) => state.authorization.userName)

  if (isLoading) return <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
  if (isAuthorize) return <Redirect to="/" />

  const onSubmit = ({ email, password }) => {
    dispatch(signIn({ email, password }))
  }

  return (
    <Form
      title="Sign in"
      footer={['Don’t have an account? ', <Link to={SIGNUP}>Sign Up.</Link>]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Email control={control} />

      <Password control={control} warrning="Password required." rules={{ required: true }} />

      <Submit control={control} value="Login" error={error} />
    </Form>
  )
}

export default SignIn
