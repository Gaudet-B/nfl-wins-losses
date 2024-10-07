import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/wordcloud')({
  component: WordCloud,
})

function WordCloud() {
  return <div className="p-2">Hello from Word Cloud!</div>
}
