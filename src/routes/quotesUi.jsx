import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/quotesUi')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /app/quotesUi</div>
}
