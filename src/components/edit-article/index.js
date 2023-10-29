import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect, useParams } from 'react-router'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { editeArticle, getArticle } from '../../store/store'
import ArticleForm from '../article-form'
import { SIGNIN } from '../../store/routing-paths'

import classes from './edit-article.module.scss'

export default function EditArticle() {
  const dispatch = useDispatch()

  const history = useHistory()
  const { slug } = useParams()

  const token = useSelector((state) => state.authorization.token)
  useDispatch(getArticle(slug))
  const isLoading = useSelector((state) => state.authorization.loading)
  const isAuthorize = useSelector((state) => state.authorization.userName)
  const article = useSelector((state) => state.openedArticle.article)
  const error = useSelector((state) => state.openedArticle.error)

  if (isLoading) return <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
  if (!isAuthorize) return <Redirect to={SIGNIN} />
  if (error) return <section className={classes.error}>Server respone whith error.</section>

  return (
    <ArticleForm
      title={article?.title}
      description={article?.description}
      body={article?.body}
      tags={article?.tagList}
      componentTitle="Edit article"
      errorMessage="Failed to edit an article."
      onSubmit={async (input) => {
        const data = {}
        // eslint-disable-next-line no-restricted-syntax
        for (const field in input) {
          if (input[field]) data[field] = input[field]
        }
        dispatch(
          editeArticle({
            token,
            data,
            slug,
            cb: () => {
              history.push('/')
            },
          })
        )
      }}
    />
  )
}
