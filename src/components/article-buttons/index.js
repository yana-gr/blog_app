import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { deleteArticle } from '../../store/store'

import classes from './article-buttons.module.scss'

export default function ArticleButtons() {
  const dispatch = useDispatch()

  const [popupOpened, setPopupOpened] = useState(false)

  const token = useSelector((state) => state.authorization.token)
  const slug = useSelector((state) => state.openedArticle.article.slug)

  const history = useHistory()

  useEffect(() => {
    const closePopup = (e) => {
      if (e.target.nodeName !== 'BUTTON' && e.target.className !== classes.popup) setPopupOpened(false)
    }
    window.addEventListener('click', closePopup)
    return () => window.removeEventListener('click', closePopup)
  })

  return (
    <div className={classes.buttons}>
      <button type="button" onClick={() => setPopupOpened(!popupOpened)}>
        Delete
      </button>

      {popupOpened && (
        <div className={classes.popup}>
          Are you sure to delete this article?
          <div>
            <button
              type="button"
              onClick={() => {
                dispatch(
                  deleteArticle({
                    token,
                    slug,
                    data: null,
                    cb: () => {
                      history.push('/')
                    },
                  })
                )
              }}
            >
              Yes
            </button>
            <button type="button" onClick={() => setPopupOpened(false)}>
              No
            </button>
          </div>
        </div>
      )}

      <button type="button" onClick={() => history.push(`/articles/${slug}/edit/`)}>
        Edit
      </button>
    </div>
  )
}
