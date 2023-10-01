import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import AppHeader from '../app-header'
import ListArticles from '../list-articles'
import ArticleFull from '../full-article'
import { getUserData } from '../../store/authorizationSlice'

import classes from './app.module.scss'

export default function App() {
  const dispatch = useDispatch()

  const token = useSelector((state) => state.authorization.token)

  useEffect(() => {
    dispatch(getUserData(token))
  }, [])

  return (
    <Router>
      <div className={classes.wrapper}>
        <AppHeader />
        <Switch>
          <Route path="/" exact component={ListArticles} />
          <Route path="/articlesList" exact component={ListArticles} />
          <Route path="/articlesList/:slug" component={ArticleFull} />
          <Redirect to="/" component={ListArticles} />
        </Switch>
      </div>
    </Router>
  )
}
