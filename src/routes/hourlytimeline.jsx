import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hourlytimeline')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /app/hourlytimeline</div>
}
