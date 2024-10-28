import { useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import useClientRect from '../hooks/useClientRef'
import AnimatedBackground, {
  ColorPalette,
} from '../components/AnimatedBackground'
import { BgControlsToggle } from '../components/AnimatedBackground/SvgControls'

export const Route = createLazyFileRoute('/animated-background')({
  component: Background,
})

/**
 * @TODO
 *
 * 1. start the animation on mount - (?) DONE (double-check first)
 *
 * 2. add a resize handler to the component
 *
 * 3. make the color palette dynamic somehow
 *    * add dropdown to change the color palette
 *
 * 4. add some mouse interactivity
 *
 */

function Background() {
  const [rect, ref] = useClientRect()
  const [showControls, setShowControls] = useState(true)
  const [colorPalette, setColorPalette] = useState<ColorPalette>('cool')

  const handleClick = () => setShowControls((prev) => !prev)

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setColorPalette(e.target.value as ColorPalette)
  }

  return (
    <div className="absolute -translate-y-[50px] pt-[50px] h-screen w-screen">
      <div ref={ref} className="h-full w-full">
        <AnimatedBackground
          containerRef={rect}
          colorPalette={colorPalette}
          showControls={showControls}
          handleColorChange={handleColorChange}
        />
        <BgControlsToggle
          showControls={showControls}
          handleClick={handleClick}
        />
      </div>
    </div>
  )
}
