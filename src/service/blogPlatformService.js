export default class blogPlatformService {
  // static #token = () => store.getState().authorization.token;

  static #customFetch = async (urlPart, payload) => {
    const response = await fetch(`https://blog.kata.academy/api/${urlPart}`, payload)
    return response
  }

  static getArticlesList = async (pageNumber, token) =>
    this.#customFetch(
      `articles?limit=5&offset=${0 + (pageNumber - 1) * 5}`,
      token && {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

  static getArticle = async ({ slug, token }) =>
    this.#customFetch(
      `articles/${slug}`,
      token && {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

  static #interactionWithArticle =
    (method) =>
    async ({ data, token, slug = '' }) =>
      this.#customFetch(`articles/${slug}`, {
        method,
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: data }),
      })

  static postArticle = this.#interactionWithArticle('POST')

  static editeArticle = this.#interactionWithArticle('PUT')

  static deleteArticle = this.#interactionWithArticle('DELETE')

  static favoriteArticle = async (slug, token, favorite) =>
    this.#customFetch(`articles/${slug}/favorite`, {
      method: favorite ? 'DELETE' : 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })

  static signUp = async (user) =>
    this.#customFetch('users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    })

  static signIn = async (user) =>
    this.#customFetch('users/login ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    })

  static getUserData = async (token) =>
    this.#customFetch('user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })

  static updateUserData = async ({ token, user }) =>
    this.#customFetch('user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user }),
    })
}
