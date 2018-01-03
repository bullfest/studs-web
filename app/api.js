import { setLoggedOut } from './auth'

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5040'
const GRAPHQL = '/graphql'
const LOGIN = '/login'
const LOGOUT = '/logout'
const PASSWORD_UPDATE = '/account/password'
const PASSWORD_FORGOT = '/forgot'
const PASSWORD_RESET = '/reset'
const EVENTS = '/events'
const COMPANIES = '/companies'
const STATUS_OK = 200
const STATUS_UNAUTHORIZED = 403

function checkStatus(response) {
  return new Promise((resolve, reject) => {
    if (response.status >= STATUS_OK && response.status < 300) {
      resolve(response)
    } else {
      reject(response)
    }
  })
}

function parseJSON(response) {
  return response.json()
}

function credentials() {
  return {
    credentials: 'include',
  }
}

function jsonHeader() {
  return {
    'Content-Type': 'application/json',
  }
}

function graphQLHeader() {
  return {
    'Content-Type': 'application/graphql',
  }
}

function header() {
  return {
    // headers: authHeader(), TODO
  }
}

function ftch(...args) {
  return fetch(...args)
    .then(checkStatus)
    .then(parseJSON)
}

function executeGraphQL(query) {
  const url = `${BASE_URL}${GRAPHQL}`
  return ftch(url, {
    method: 'POST',
    ...credentials(),
    headers: {
      ...graphQLHeader(),
    },
    body: query,
  }).catch(res => {
    if (res.status === STATUS_UNAUTHORIZED) {
      setLoggedOut()
    }
    return Promise.reject(res)
  })
}

const USER_PROFILE_FIELDS = `
  memberType
  email
  firstName
  lastName
  phone
  picture
  allergies
  master
  position
  picture
`

export function fetchUser() {
  const query = `{
    user {
      profile {
        ${USER_PROFILE_FIELDS}
      }
    }
  }
  `
  return executeGraphQL(query).then(res => res.data.user.profile)
}

function toGraphQLFields(str) {
  return JSON.stringify(str).replace(/"([^"]*)":/g, '$1:')
}

export function updateUser(newFields) {
  const mutation = `mutation {
    updateProfile(fields: ${toGraphQLFields(newFields)}) {
      ${USER_PROFILE_FIELDS}
    }
  }
  `
  return executeGraphQL(mutation).then(res => res.data.updateProfile)
}

export function loginUser(email, password) {
  const data = {
    email,
    password,
  }
  const post = {
    method: 'POST',
    ...credentials(),
    headers: {
      ...jsonHeader(),
    },
    body: JSON.stringify(data),
  }
  return ftch(BASE_URL+LOGIN, post)
}

export function logoutUser() {
  return ftch(`${BASE_URL}${LOGOUT}`, { ...credentials() })
}

export function updateUserPassword({ password, confirmPassword }) {
  const post = {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...jsonHeader(),
    },
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  }
  return ftch(BASE_URL+PASSWORD_UPDATE, post)
}

export function fetchUsers() {
  const query = `{
    users(memberType: studs_member) {
      profile { ${USER_PROFILE_FIELDS} }
      cv { ${CV_FIELDS} }
    }
  }
  `
  return executeGraphQL(query).then(res => res.data.users)
}

const CV_FIELDS = `
  sections {
    title
    items {
      title
      description
      when
      organization
      city
    }
  }
`

export function fetchCv() {
  const query = `{
    user {
      cv { ${CV_FIELDS} }
    }
  }
  `
  return executeGraphQL(query).then(res => res.data.user.cv)
}

export function updateCv(id, cv) {
  const mutation = `mutation {
    updateCV(fields: ${toGraphQLFields(cv)}) {
      ${CV_FIELDS}
    }
  }
  `
  return executeGraphQL(mutation).then(res => res.data.updateCV)
}

export function requestPasswordReset(email) {
  const url = `${BASE_URL}${PASSWORD_FORGOT}`
  return ftch(url, {
    method: 'POST',
    headers: {
      ...jsonHeader(),
    },
    body: JSON.stringify({
      email,
    }),
  })
}

export function resetPassword(password, confirmPassword, token) {
  const url = `${BASE_URL}${PASSWORD_RESET}/${token}`
  return ftch(url, {
    method: 'POST',
    headers: {
      ...jsonHeader(),
    },
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  })
}

export function fetchEvents() {
  return ftch(BASE_URL+EVENTS, header())
}

export function updateEvent(id, event) {
  return ftch(`${BASE_URL}${EVENTS}/${id}`, {
    ...header(),
    method: 'PATCH',
    body: event,
  })
}

export function fetchCompanies() {
  return ftch(BASE_URL+COMPANIES, header())
}

export function createEvent(event) {
  return ftch(`${BASE_URL}${EVENTS}`, {
    headers: {
      // ...authHeader(), TODO
      ...jsonHeader(),
    },
    method: 'POST',
    body: JSON.stringify(event),
  })
}

export function fetchMissingForms(eventId) {
  return ftch(`${BASE_URL}${EVENTS}/${eventId}/missing_forms`, header())
}

export function notifyBefore(eventId) {
  return ftch(`${BASE_URL}${EVENTS}/${eventId}/notify_before`, header())
}

export function notifyAfter(eventId) {
  return ftch(`${BASE_URL}${EVENTS}/${eventId}/notify_after`, header())
}

export function importData(eventId) {
  return fetch(`${BASE_URL}${EVENTS}/${eventId}/import_formdata`, header())
    .then(checkStatus)
}
