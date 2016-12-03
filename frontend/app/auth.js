const baseUrl = 'http://localhost:3333/';
const meUrl = 'users/me';
const STATUS_OK = 200;

export function login(email, pass, cb) {
  const token = btoa(`${email}:${pass}`);
  fetch(baseUrl+meUrl, {
    headers: {
      'Authorization': 'Basic ' + token
    }
  }).then(res => {
    if(res.status === STATUS_OK) {
      localStorage.token = token;
      cb(true);
      return res.json();
    } else {
      cb(false);
    }
  }).then(user => {
    console.log(user);
  });
}

export function requireAuth(nextState, replace) {
  if(!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export function loggedIn() {
  return !!localStorage.token;
}
