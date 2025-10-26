import { createFileRoute } from '@tanstack/react-router'
import { ViolationsLogsFull } from '../components/ViolationLogs'

export const Route = createFileRoute('/violations')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ViolationsLogsFull/>
}
