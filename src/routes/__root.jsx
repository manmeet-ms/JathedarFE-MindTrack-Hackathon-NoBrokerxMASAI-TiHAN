import { createRootRoute } from '@tanstack/react-router'
import * as React from 'react'
import App from '../App'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <App/>
      {/* <Outlet /> */}
    </React.Fragment>
  )
}
