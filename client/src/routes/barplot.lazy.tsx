import { createLazyFileRoute } from '@tanstack/react-router'
import CircularBarplot from '../components/CircularBarplot'

export const Route = createLazyFileRoute('/barplot')({
  component: Barplot,
})

function Barplot() {
  return <CircularBarplot />
}
