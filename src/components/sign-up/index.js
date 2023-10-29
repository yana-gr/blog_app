import { useEffect, useState, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import Form, { Checkbox, Email, Input, Password, Submit, Username } from '../forms'
import { clearAuthorizationErrors, signUp } from '../../store/store'
import { SIGNIN } from '../../store/routing-paths'

function SignUp() {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(clearAuthorizationErrors())
  }, [])

  const serverErrors = useSelector((state) => state.authorization.errors)
  const isLoading = useSelector((state) => state.authorization.loading)
  const isAuthorize = useSelector((state) => state.authorization.userName)

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  useEffect(() => {
    setNameError(!!serverErrors?.username)
    setEmailError(!!serverErrors?.email)
  }, [serverErrors])

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({ mode: 'onBlur' })

  if (isLoading) return <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
  if (isAuthorize) return <Redirect to="/" />

  const onSubmit = ({ username, email, password }) => {
    dispatch(signUp({ username, email, password }))
  }

  return (
    <Form
      title="Create new account"
      footer={['Already have an account? ', <Link to={SIGNIN}>Sign In.</Link>]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Username control={control} serverError={nameError} onChange={() => setNameError(false)} />

      <Email control={control} serverError={emailError} onChange={() => setEmailError(false)} />

      <Password
        control={control}
        warrning="
          Your password needs to be at least 6 and not longer then 40
          characters."
      />

      <Input
        label="Repeat Password"
        placeholder="Password"
        error={formErrors?.repeatPassword}
        warrning={formErrors?.repeatPassword && 'Passwords must match.'}
        fieldProps={{
          ...register('repeatPassword', {
            required: true,
            validate: (value) => value === watch('password'),
          }),
          type: 'password',
        }}
      />

      <Checkbox control={control} />

      <Submit control={control} value="Create" />
    </Form>
  )
}

export default SignUp
