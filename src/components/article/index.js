import { React, useState } from 'react'
import { format } from 'date-fns'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import blogPlatformService from '../../service/blogPlatformService'

import classes from './article.module.scss'

export default function Article({ article }) {
  const isAuthorized = useSelector((state) => state.authorization.userName)
  const token = useSelector((state) => state.authorization.token)

  const [_favoritesCount, setFavoritesCount] = useState(article?.favoritesCount)
  const [_favorited, setFavorited] = useState(article?.favorited)

  const like = async () => {
    try {
      const resp = await blogPlatformService.favoriteArticle(article.slug, token, _favorited)
      if (resp.ok) {
        setFavoritesCount(_favoritesCount + (_favorited ? -1 : 1))
        setFavorited(!_favorited)
      }
    } catch (err) {
      return err
    }
  }

  const likes = {
    _favoritesCount,
    _favorited,
  }

  return (
    <div className={classes.article}>
      <div className={classes.article__main}>
        <div className={classes.article__title_like}>
          <Link to={{ pathname: `/articlesList/${article.slug}`, state: likes }} className={classes.article__title}>
            {article.title}
          </Link>
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
    </div>
  )
}
