import { Link } from '@tanstack/react-router'
import AnimatedBackground, { ColorPalette } from '../AnimatedBackground'
import useClientRect from '../../hooks/useClientRef'
import preview from '../../data/preview.svg'

export function LargeButton({
  colorPalette,
  route,
}: {
  colorPalette: ColorPalette
  route: '/barplot' | '/animated-background'
}) {
  const isBarplot = route === '/barplot'
  const text = isBarplot ? 'circular barplot' : 'animated background'
  const [rect, ref] = useClientRect()

  return (
    <Link to={route}>
      <button className="group h-[300px] w-[400px] border text-center hover:border-blue-500 rounded-lg overflow-hidden border-white transition-transform duration-1000">
        <div className="relative z-10 h-[300px] w-[400px] pt-4 bg-blue-500 rounded-lg transition-transform duration-500 group-hover:-translate-y-full">
          <span className="z-30 text-white group-hover:text-transparent text-lg">
            {text}
          </span>
        </div>
        <div
          className={`h-[300px] w-[400px] bg-cover bg-no-repeat group-hover:translate-x-0 transition-transform duration-0 -translate-y-full ${isBarplot ? 'h-[280px] w-[360px] m-auto' : ''}`}
          style={{ backgroundImage: isBarplot ? `url(${preview})` : undefined }}
        >
          {!isBarplot && (
            <div ref={ref} className="h-full w-full">
              <AnimatedBackground
                containerRef={rect}
                colorPalette={colorPalette}
              />
            </div>
          )}
        </div>
      </button>
    </Link>
  )
}
