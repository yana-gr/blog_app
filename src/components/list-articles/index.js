import { useEffect } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'

import { getArticlesList, togglePage } from '../../store/store'
import Article from '../article'

import classes from './list-articles.module.scss'

export default function ListArticles() {
  const dispatch = useDispatch()

  const history = useHistory()

  const isAuthorized = useSelector((state) => state.authorization.userName)
  const token = useSelector((state) => state.authorization.token)
  const articles = useSelector((state) => state.articlesList.articles)
  const totalPages = useSelector((state) => Math.ceil(state.articlesList.totalArticles / 5))
  const currentPage = useSelector((state) => state.articlesList.currentPage)
  const error = useSelector((state) => state.articlesList.error)
  const loading = useSelector((state) => state.articlesList.loading)

  useEffect(() => {
    dispatch(getArticlesList({ pageNumber: 1, token: isAuthorized ? token : null }))
  }, [isAuthorized])

  const onClick = (page) => {
    dispatch(togglePage(page))
    dispatch(getArticlesList({ pageNumber: page, token: token || null }))
  }

  useEffect(() => {
    dispatch(togglePage(1))
  }, [history])

  if (loading)
    return <Spin className={classes.spin} size="large" indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />

  if (error) return <section className={classes.error}>Error. Try again later</section>

  return (
    <>
      <div className={classes.list_articles}>
        {articles.map((article) => (
          <Article key={nanoid()} article={article} />
        ))}
      </div>
      <Pagination
        className={classes.pagination}
        defaultCurrent={1}
        current={currentPage}
        total={totalPages}
        showSizeChanger={false}
        pageSize={1}
        onChange={onClick}
      />
    </>
  )
}
