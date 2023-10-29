import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

// import { getArticlesList, logOut, togglePage } from '../../store/store'
import { logOut } from '../../store/store'
import { CREATE, PROFILE, SIGNIN, SIGNUP } from '../../store/routing-paths'

import placeholder from './avatar.png'
import classes from './app-header.module.scss'

export default function AppHeader() {
  const dispatch = useDispatch()

  const history = useHistory()

  const user = useSelector((state) => state.authorization)

  return (
    <div className={classes.header}>
      <Link to="/articlesList" className={classes.header__name}>
        Realworld Blog
      </Link>

      {user.userName && (
        <button type="button" className={classes.header__create} onClick={() => history.push(CREATE)}>
          Create article
        </button>
      )}

      {user.userName && (
        <Link to={PROFILE} className={classes.header__user}>
          <span className={classes.header__userName}>{user.userName}</span>
          {user.image && (
            <img
              className={classes.header__avatar}
              src={user.image}
              alt="user avatar"
              onError={(e) => {
                e.target.src = placeholder
              }}
            />
          )}
        </Link>
      )}

      {user.userName && (
        <button
          type="button"
          className={classes.header__logOut}
          onClick={() => {
            dispatch(logOut())
            history.push('/')
          }}
        >
          Log Out
        </button>
      )}

      {!user.userName && (
        <button
          type="button"
          className={classes.header__signIn}
          onClick={() => {
            history.push(SIGNIN)
          }}
        >
          Sign In
        </button>
      )}

      {!user.userName && (
        <button
          type="button"
          className={classes.header__signUp}
          onClick={() => {
            history.push(SIGNUP)
          }}
        >
          Sign Up
        </button>
      )}
    </div>
  )
}
