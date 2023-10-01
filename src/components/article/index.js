import React from 'react'
import { format } from 'date-fns'
import { nanoid } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

import classes from './article.module.scss'
import heart from './heart.svg'

export default function Article({ article }) {
  return (
    <div className={classes.article}>
      <div className={classes.article__main}>
        <div className={classes.article__title_like}>
          <Link to={`/articlesList/${article.slug}`} className={classes.article__title}>
            {article.title}
          </Link>
          <img src={heart} alt="heart" className={classes.article__like} />
          <span className={classes.article__count_like}>{article.favoritesCount}</span>
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
