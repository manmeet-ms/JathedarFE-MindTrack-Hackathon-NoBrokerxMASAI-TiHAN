import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/p/landing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /landing</div>
}
