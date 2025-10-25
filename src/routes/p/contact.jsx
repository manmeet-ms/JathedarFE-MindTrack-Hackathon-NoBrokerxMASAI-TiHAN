import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/p/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /contact</div>
}
