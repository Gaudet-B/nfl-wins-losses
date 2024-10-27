import { createLazyFileRoute } from '@tanstack/react-router'
import AnimatedBackground from '../components/AnimatedBackground'
import useClientRect from '../hooks/useClientRef'

export const Route = createLazyFileRoute('/animated-background')({
  component: Background,
})

/**
 * @TODO
 *
 * 1. start the animation on mount
 *
 * 2. add a resize handler to the component
 *
 * 3. make the color palette dynamic somehow
 *
 * 4. add some mouse interactivity
 *
 */

function Background() {
  const [rect, ref] = useClientRect()
  return (
    <div className="absolute -translate-y-[50px] h-screen w-screen bg-gradient-to-b from-[#368CE1] from-20% to-[#6E40AA] to-80%">
      <div ref={ref} className="h-full w-full">
        <AnimatedBackground containerRef={rect} />
      </div>
    </div>
  )
}
