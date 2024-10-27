import { useMemo, useState } from 'react'
import backgroundData from '../../data/backgroundData'

const BUTTONS = ['Play', 'Pause', 'Randomize'] as const

function Btn({
  isPlaying,
  text,
  handleClick,
}: {
  isPlaying: boolean
  text: (typeof BUTTONS)[number]
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    action: 'play' | 'pause' | 'randomize'
  ) => void
}) {
  if (isPlaying && text === 'Play') return null
  if (!isPlaying && text === 'Pause') return null
  if (isPlaying && text === 'Randomize') return null
  return (
    <button
      onClick={(e) =>
        handleClick(e, text.toLowerCase() as 'play' | 'pause' | 'randomize')
      }
      className={`p-2 rounded-md ${text === 'Pause' ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}`}
    >
      {text}
    </button>
  )
}

function SvgControls({
  isPlaying,
  onPlay,
  onPause,
  onRandomize,
}: {
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onRandomize: () => void
}) {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: 'play' | 'pause' | 'randomize'
  ) => {
    e.preventDefault()
    if (action === 'play') onPlay()
    if (action === 'pause') onPause()
    if (action === 'randomize') onRandomize()
  }

  return (
    <div className="absolute flex gap-2 top-12 left-0 p-4">
      {/** @TODO make a standard Button */}
      {BUTTONS.map((text, i) => (
        <Btn
          text={text}
          isPlaying={isPlaying}
          handleClick={handleClick}
          key={`control-btn-${i + 1}-(${text})`}
        />
      ))}
    </div>
  )
}

function SvgBuilder({
  fill,
  paths,
  height,
  width,
}: {
  fill?: (i: number) => string
  paths: Array<string>
  height: number
  width: number
}) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="max-w-full h-auto">
      {/** @TODO play with "translate-y" more */}
      <g className="">
        {Array.from({ length: 10 }).map((_, i) => {
          const idx = i === 4 || i === 5 ? 4.5 : i
          return (
            <>
              {i === 4 && (
                <g key={`wave-${i}-${i + 1}`}>
                  <path
                    d={paths[i]}
                    fill={fill?.(i) ?? 'none'}
                    className="transition-all delay-0 duration-[5000ms] ease-linear"
                    opacity={0.5}
                  />
                </g>
              )}
              <g key={`wave-${i + 1}`}>
                <path
                  d={paths[i]}
                  fill={fill?.(idx) ?? 'none'}
                  className="transition-all delay-0 duration-[5000ms] ease-linear"
                />
              </g>
              {i === 5 && (
                <g key={`wave${i}-${i + 1}`}>
                  <path
                    d={paths[i]}
                    fill={fill?.(i) ?? 'none'}
                    className="transition-all delay-0 duration-[5000ms] ease-linear"
                    opacity={0.5}
                  />
                </g>
              )}
            </>
          )
        })}
      </g>
    </svg>
  )
}

export default function AnimatedBackground({
  containerRef,
}: {
  containerRef: DOMRect | null
}) {
  const height = containerRef?.height ?? 0
  const width = containerRef?.width ?? 0

  const { area, fill, randomizeLayers } = useMemo(
    () => backgroundData(height, width),
    [height, width]
  )

  const [paths, setPaths] = useState<string[]>(Array.from({ length: 10 }))

  const generateNewPaths = () => {
    const randomLayers = randomizeLayers()
    if (!randomLayers || !area) return []
    return randomLayers.map((layer) => {
      const values = layer.map((d) => {
        return [d[0], d[1]] as [number, number]
      })
      const path = area(values)
      return path || ''
    })
  }

  const [isPlaying, setIsPlaying] = useState(false)

  const [intervalId, setIntervalId] = useState<number | null>(null)

  const stopInterval = () => {
    if (intervalId) clearInterval(intervalId)
    setIntervalId(null)
    setIsPlaying(false)
  }

  const startInterval = () => {
    stopInterval()
    const id = setInterval(() => {
      setPaths(generateNewPaths())
    }, 4950)
    setIntervalId(id)
    setIsPlaying(true)
  }

  const handleRandomize = () => setPaths(generateNewPaths())

  return (
    <>
      <SvgBuilder fill={fill} paths={paths} height={height} width={width} />
      <SvgControls
        isPlaying={isPlaying}
        onPlay={startInterval}
        onPause={stopInterval}
        onRandomize={handleRandomize}
      />
    </>
  )
}
