import { useCallback, useEffect, useMemo, useState } from 'react'
import backgroundData from '../../data/backgroundData'
import SvgBuilder from './SvgBuilder'
import SvgControls from './SvgControls'
import debounce from 'lodash.debounce'

/**
 * @TODO
 *  - try "flipping" some of these: [inferno, magma, plasma, rainbow, sinebow, cividis, cubehelix]
 *  - try the entire scale for these: [rainbow, sinebow, cividis, cubehelix]
 */
export const COLOR_PALETTE = {
  turbo: {
    from: 'from-[#27D7C4]',
    // to: 'to-[#23171B]',
    to: 'to-[#3F2B76]',
  },
  viridis: {
    from: 'from-[#355f8d]',
    to: 'to-[#440154]',
  },
  inferno: {
    from: 'from-[#f37819]',
    to: 'to-[#fcffa4]',
  },
  magma: {
    from: 'from-[#641a80]',
    to: 'to-[#000004]',
  },
  plasma: {
    from: 'from-[#8f0da4]',
    to: 'to-[#0d0887]',
  },
  cividis: {
    from: 'from-[#4D566D]',
    to: 'to-[#002051]',
  },
  warm: {
    from: 'from-[#E4419D]',
    to: 'to-[#6E40AA]',
  },
  cool: {
    from: 'from-[#368CE1]',
    to: 'to-[#6E40AA]',
  },
  rainbow: {
    from: 'from-[#FF7847]',
    to: 'to-[#6E40AA]',
  },
  sinebow: {
    from: 'from-[#58FC2A]',
    to: 'to-[#FF4040]',
  },
  cubehelix: {
    from: 'from-[#CF9CDA]',
    to: 'to-[#EFFAF5]',
  },
}

export const COLOR_PALETTE_KEYS = Object.keys(COLOR_PALETTE) as ColorPalette[]

export type ControlsPosition = 't' | 'b' | 'l' | 'r' | 'tl' | 'tr' | 'bl' | 'br'
export type ColorPalette =
  | 'turbo'
  | 'viridis'
  | 'inferno'
  | 'magma'
  | 'plasma'
  | 'cividis'
  | 'warm'
  | 'cool'
  | 'rainbow'
  | 'sinebow'
  | 'cubehelix'

export default function AnimatedBackground({
  containerRef,
  showControls,
  colorPalette = 'cool',
  controlsPosition = 'tl',
  handleColorChange,
}: {
  containerRef: DOMRect | null
  colorPalette?: ColorPalette
  showControls?: boolean
  controlsPosition?: ControlsPosition
  handleColorChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  const height = containerRef?.height ?? 0
  const width = containerRef?.width ?? 0

  const { area, fill, randomizeLayers } = useMemo(
    () => backgroundData(height, width, colorPalette),
    [colorPalette, height, width]
  )

  const generateNewPaths = useCallback(() => {
    const randomLayers = randomizeLayers()
    if (!randomLayers || !area) return []
    return randomLayers.map((layer) => {
      const values = layer.map((d) => {
        return [d[0], d[1]] as [number, number]
      })
      const path = area(values)
      return path || ''
    })
  }, [area, fill, randomizeLayers])

  const [paths, setPaths] = useState<string[]>(Array.from({ length: 10 }))

  const [isPlaying, setIsPlaying] = useState(true)

  const [intervalId, setIntervalId] = useState<number | null>(null)

  const handleRandomize = () => setPaths(generateNewPaths())

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
      setIsPlaying(false)
    }
  }

  const startInterval = debounce(() => {
    if (intervalId) clearInterval(intervalId)
    // stopInterval()
    handleRandomize()
    setIntervalId(() => {
      setIsPlaying(true)
      return setInterval(() => handleRandomize(), 4950)
    })
  }, 1000)

  const startAnimation = () => {
    if (intervalId) clearInterval(intervalId)
    handleRandomize()
    setTimeout(() => handleRandomize(), 100)
    // setIsPlaying(true)
    if (!intervalId) setTimeout(() => startInterval(), 5000)
  }

  const colors = COLOR_PALETTE[colorPalette]
  const { from, to } = colors

  return (
    <div className={`bg-gradient-to-b ${from} from-20% ${to} to-80%`}>
      {showControls && (
        <SvgControls
          colorPalette={colorPalette}
          isPlaying={isPlaying}
          position={controlsPosition}
          onPlay={startInterval}
          onPause={stopInterval}
          onRandomize={handleRandomize}
          handleColorChange={handleColorChange}
        />
      )}
      <SvgBuilder
        fill={fill}
        isPlaying={isPlaying}
        colorPalette={colorPalette}
        start={startAnimation}
        stop={stopInterval}
        paths={paths}
        height={height}
        width={width}
      />
    </div>
  )
}
