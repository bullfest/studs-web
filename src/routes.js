// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar
// etc See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more
// information about the code splitting business
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { getAsyncInjectors } from 'utils/asyncInjectors'
import { requireAuth } from './auth'
import HomePage from 'containers/HomePage'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err)
}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export default function createRoutes(store) {
  return (
    <Switch>
      <Route exact path='/' component={HomePage}/>
    </Switch>
  )
  // Create reusable async injectors using getAsyncInjectors factory
  // const {
  //   injectReducer,
  // } = getAsyncInjectors(store) // eslint-disable-line no-unused-vars

  // return [
  //   {
  //     path: '/',
  //     name: 'home',
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Members/reducer'),
  //         System.import('containers/HomePage'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => { injectReducer('members', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/login',
  //     name: 'login',
  //     getComponent(location, cb) {
  //       System.import('containers/Login')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '/logout',
  //     name: 'logout',
  //     getComponent(location, cb) {
  //       System.import('containers/Logout')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '/password-reset/:token',
  //     name: 'password_reset',
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/PasswordReset/reducer'),
  //         System.import('containers/PasswordReset'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('passwordReset', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/user',
  //     name: 'user',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/User/reducer'),
  //         System.import('containers/User'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('user', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/members',
  //     name: 'members',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Members/reducer'),
  //         System.import('containers/Members'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('members', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/members/:id',
  //     name: 'members',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Members/reducer'),
  //         System.import('containers/Members'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('members', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/resume/edit',
  //     name: 'cvEdit',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/CvEdit/reducer'),
  //         System.import('containers/CvEdit'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('cv', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/user/forgot-password',
  //     name: 'forgotPassword',
  //     getComponent(location, cb) {
  //       System.import('containers/ForgotPassword')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events',
  //     name: 'events',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Events/reducer'),
  //         System.import('containers/Events'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('events', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events/public',
  //     name: 'publicEvents',
  //     getComponent(location, cb) {
  //       System.import('containers/PublicEvents')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events/new',
  //     name: 'events/new',
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Events/reducer'),
  //         System.import('containers/Events'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('events', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events/:id',
  //     name: 'events',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Events/reducer'),
  //         System.import('containers/Events'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('events', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events/:id/edit',
  //     name: 'events/edit',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Events/reducer'),
  //         System.import('containers/Events'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('events', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/trip',
  //     name: 'trip',
  //     getComponent(location, cb) {
  //       System.import('containers/Trip')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '*',
  //     name: 'notfound',
  //     getComponent(nextState, cb) {
  //       System.import('containers/NotFoundPage')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   },
  // ]
}
