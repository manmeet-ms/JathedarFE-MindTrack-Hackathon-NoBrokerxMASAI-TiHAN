import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/p/philosophy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /philosophy</div>
}
