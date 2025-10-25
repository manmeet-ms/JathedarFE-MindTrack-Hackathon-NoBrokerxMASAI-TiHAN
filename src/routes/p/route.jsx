import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/p')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet/>
}
