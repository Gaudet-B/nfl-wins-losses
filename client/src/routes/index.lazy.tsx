import { createLazyFileRoute } from '@tanstack/react-router'
import LargeButton from '../components/LargeButton'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

const routes = ['/barplot', '/wordcloud'] as const

function Index() {
  return (
    <div className="w-full p-6 flex gap-6 justify-center">
      {routes.map((route) => (
        <LargeButton key={route} route={route} />
      ))}
    </div>
  )
}
