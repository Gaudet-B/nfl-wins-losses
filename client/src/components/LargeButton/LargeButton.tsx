import { Link } from '@tanstack/react-router'
import preview from '../../data/preview.svg'

export function LargeButton({
  route,
}: {
  route: '/barplot' | '/animated-background'
}) {
  const isBarplot = route === '/barplot'
  const text = isBarplot ? 'circular barplot' : 'animated background'

  return (
    <Link to={route}>
      <button className="group h-[300px] w-[400px] border text-center hover:border-blue-500 rounded-lg overflow-hidden border-white transition-transform duration-1000">
        <div className="relative z-10 pt-4 h-[380px] w-[400px] bg-blue-500 rounded-lg transition-transform duration-500 group-hover:-translate-y-full">
          <span className="z-30 text-white group-hover:text-transparent text-lg">
            {text}
          </span>
        </div>
        <div
          className="h-[300px] w-[400px] mt-12 bg-bottom bg-no-repeat bg-contain group-hover:translate-x-0 transition-transform duration-0 -translate-y-96"
          style={
            isBarplot
              ? {
                  backgroundImage: `url(${preview})`,
                }
              : {}
          }
        />
      </button>
    </Link>
  )
}
