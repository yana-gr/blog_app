import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { postArticle } from '../../store/store'
import { SIGNIN } from '../../store/routing-paths'
import ArticleForm from '../article-form'

export default function CreateArticle() {
  const dispatch = useDispatch()

  const history = useHistory()

  const token = useSelector((state) => state.authorization.token)
  const isLoading = useSelector((state) => state.authorization.loading)
  const isAuthorize = useSelector((state) => state.authorization.userName)

  if (isLoading) return <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
  if (!isAuthorize) return <Redirect to={SIGNIN} />

  return (
    <ArticleForm
      componentTitle="Create new article"
      errorMessage="Failed to create an article."
      onSubmit={async (input) => {
        const data = {}
        // eslint-disable-next-line no-restricted-syntax
        for (const field in input) {
          if (input[field] && input[field].length !== 0) data[field] = input[field]
        }
        dispatch(
          postArticle({
            token,
            data,
            cb: () => {
              history.push('/')
            },
          })
        )
      }}
    />
  )
}
