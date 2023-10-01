import React from 'react'
import { Link } from 'react-router-dom'

import classes from './app-header.module.scss'

export default function AppHeader() {
  return (
    <div className={classes.header}>
      <Link to="/articlesList" className={classes.header__name}>
        Realworld Blog
      </Link>
      <button
        // key={item.id}
        type="button"
        className={classes.header__signIn}
        // onClick={() => {
        //   togglePriceLevelChange(item.id)
        // }}
      >
        Sign In
      </button>
      <button
        // key={item.id}
        type="button"
        className={classes.header__signUp}
        // onClick={() => {
        //   togglePriceLevelChange(item.id)
        // }}
      >
        Sign Up
      </button>
    </div>
  )
}
