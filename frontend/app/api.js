const baseUrl = 'http://localhost:5040'
const usersUrl = '/users'
const loginUrl = '/login'
const passwordResetUrl = '/users/password-reset'
const cvUrl = '/resume'
const eventsUrl = '/events'
const companiesUrl = '/companies'
const STATUS_OK = 200

function checkStatus(response) {
  if (response.status >= STATUS_OK && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
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

export function fetchUser() {
  // TODO extract constant
  const query = `{
    user {
      email
      firstName
      lastName
      phone
      picture
      alergies
      master
    }
  }
  `
  const url = `http://localhost:5040/graphql?query=${query}`
  return ftch(url, { ...credentials() })
    .then(res => Promise.resolve(res.data.user))
}

export function loginUser(email, password) {
  const data = {
    email,
    password,
  }
  const post = {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...jsonHeader(),
    },
    body: JSON.stringify(data),
  }
  return ftch(baseUrl+loginUrl, post)
}

export function updateUser(id, user) {
  return ftch(baseUrl+usersUrl+'/'+id, {
    ...header(),
    method: 'PATCH',
    body: user,
  })
}

export function updateUserPassword(user) {
  return ftch(baseUrl+passwordResetUrl, {
    method: 'PATCH',
    body: user,
  })
}

export function fetchUsers() {
  return ftch(baseUrl+usersUrl, header())
}

export function fetchCv(id) {
  return ftch(`${baseUrl}${usersUrl}/${id}${cvUrl}`, header())
}

export function updateCv(id, cv) {
  return ftch(`${baseUrl}${usersUrl}/${id}${cvUrl}`, {
    headers: {
      // ...authHeader(), TODO
      ...jsonHeader(),
    },
    method: 'PATCH',
    body: JSON.stringify(cv),
  })
}

export function requestPasswordReset(email) {
  return ftch(`${baseUrl}${passwordResetUrl}?email=${email}`)
}

export function fetchEvents() {
  return ftch(baseUrl+eventsUrl, header())
}

export function updateEvent(id, event) {
  return ftch(`${baseUrl}${eventsUrl}/${id}`, {
    ...header(),
    method: 'PATCH',
    body: event,
  })
}

export function fetchCompanies() {
  return ftch(baseUrl+companiesUrl, header())
}

export function createEvent(event) {
  return ftch(`${baseUrl}${eventsUrl}`, {
    headers: {
      // ...authHeader(), TODO
      ...jsonHeader(),
    },
    method: 'POST',
    body: JSON.stringify(event),
  })
}

export function fetchMissingForms(eventId) {
  return ftch(`${baseUrl}${eventsUrl}/${eventId}/missing_forms`, header())
}

export function notifyBefore(eventId) {
  return ftch(`${baseUrl}${eventsUrl}/${eventId}/notify_before`, header())
}

export function notifyAfter(eventId) {
  return ftch(`${baseUrl}${eventsUrl}/${eventId}/notify_after`, header())
}

export function importData(eventId) {
  return fetch(`${baseUrl}${eventsUrl}/${eventId}/import_formdata`, header())
    .then(checkStatus)
}
