import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'
import { format } from 'date-fns'

import blogPlatformService from '../../service/blogPlatformService'
import ArticleButtons from '../article-buttons'
import { getArticle } from '../../store/store'

import classes from './fullArticle.module.scss'

function ArticleFull() {
  const location = useLocation()

  const dispatch = useDispatch()

  const article = useSelector((state) => state.openedArticle.article)
  const error = useSelector((state) => state.openedArticle.error)
  const loading = useSelector((state) => state.openedArticle.loading)

  const isAuthorized = useSelector((state) => state.authorization.userName)
  const token = useSelector((state) => state.authorization.token)

  const isAllowInteract = article?.author.username === isAuthorized

  const { slug } = useParams()
  useEffect(() => {
    dispatch(getArticle({ slug, token: isAuthorized ? token : null }))
  }, [isAuthorized])

  const [_favoritesCount, setFavoritesCount] = useState(location.state._favoritesCount)
  const [_favorited, setFavorited] = useState(location.state._favorited)

  const like = async () => {
    try {
      const resp = await blogPlatformService.favoriteArticle(slug, token, location.state._favorited)
      if (resp.ok) {
        setFavoritesCount(_favoritesCount + (_favorited ? -1 : 1))
        setFavorited(!_favorited)
      }
    } catch (err) {
      return err
    }
  }

  if (loading || !article)
    return <Spin className={classes.spin} size="large" indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />

  if (error) return <section className={classes.error}>Error. Try again later</section>

  if (article) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.article}>
          <div className={classes.article__main}>
            <div className={classes.article__title_like}>
              <h6 className={classes.article__title}>{article.title}</h6>
              <button
                type="button"
                className={[
                  classes['article__like-button'],
                  classes[!_favorited ? 'article__like-button_liked' : 'article__like-button_no-liked'],
                ].join(' ')}
                onClick={isAuthorized ? like : undefined}
              >
                {_favoritesCount}
              </button>
            </div>
            {article.tagList.map((tag) => (
              <span className={classes.article__tags} key={nanoid()}>
                {tag}
              </span>
            ))}
            <article className={classes.article__text}>{article.description}</article>
          </div>
          <div className={classes.article__name_date}>
            <h6 className={classes.article__name}>{article.author.username}</h6>
            <span className={classes.article__date}>{String(format(new Date(article.createdAt), 'MMMM d,yyyy'))}</span>
          </div>
          <img src={article.author.image} alt="avatar" className={classes.article__avatar} />
          <ReactMarkdown className={classes.body} remarkPlugins={[remarkGfm]}>
            {article?.body}
          </ReactMarkdown>
          {isAllowInteract && <ArticleButtons />}
        </div>
      </div>
    )
  }
}

export default ArticleFull
