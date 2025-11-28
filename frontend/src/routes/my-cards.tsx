import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-cards')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/my-cards"!</div>
}
