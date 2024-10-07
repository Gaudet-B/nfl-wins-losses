import { Link } from '@tanstack/react-router'

export function LargeButton({ route }: { route: '/barplot' | '/wordcloud' }) {
  return (
    <Link to={route}>
      <button className="h-[300px] w-[300px] p-2 border border-blue-500 text-blue-500 hover:border-white hover:bg-blue-500 hover:text-white rounded-lg">
        {route.replace('/', '')}
      </button>
    </Link>
  )
}
