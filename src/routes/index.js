import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from 'src/pages/Home'
import ExchangePage from 'src/pages/Exchange'
import HowToStartPage from 'src/pages/HowToStart'

export default [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/exchange',
    exact: true,
    component: ExchangePage,
  },
  {
    path: '/how-to-start',
    exact: true,
    component: HowToStartPage,
  }
]

export const renderRoutes = (routes = [], extraProps = {}) => (
  routes.map((route, i) => (
    <Route
      key={route.key || i}
      path={route.path}
      exact={route.exact}
      render={props => (
        <route.component
          {...props}
          {...extraProps}
          routes={route.routes}
        />
      )}
    />
  ))
)
