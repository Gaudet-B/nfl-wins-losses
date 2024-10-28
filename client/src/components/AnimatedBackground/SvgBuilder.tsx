import React, { PropsWithChildren, useEffect } from 'react'
import { ColorPalette } from './AnimatedBackground'

/**
 * @note OPACITY: the opacity of the center waves
 * a value of '1' will result in a visible "horizon" or "y-axis"
 * a value of '0' will result in no line and center waves that are the same color
 */
const OPACITY = 0

const EXCLUDE_ZERO_INDEX = ['turbo', 'cubeheilx']

function SvgContainer({
  children,
  // isPlaying,
  start,
  stop,
}: PropsWithChildren<{
  isPlaying: boolean
  start: () => void
  stop: () => void
}>) {
  useEffect(() => {
    // if (!isPlaying) start()
    start()
    return () => stop()
  }, [])
  return (
    /** @TODO add "translate-y" here ??? */
    <g id={'svg-container'}>{children}</g>
  )
}

const Wave = React.memo(
  ({
    idx,
    path,
    transparent,
    fill,
  }: {
    idx: number
    path: string
    transparent?: boolean
    fill: string | undefined
  }) => {
    return (
      <g
        key={`wave-${idx}-${idx + 1}`}
        opacity={transparent ? OPACITY : undefined}
      >
        <path
          d={path}
          fill={fill}
          className="transition-all delay-0 duration-[5000ms] ease-linear"
          // opacity={transparent ? 0.5 : undefined}
        />
      </g>
    )
  },
  (prev, next) => prev.path === next.path
)

function WaveBuilder({
  i,
  idx,
  paths,
  colorPalette,
  fill,
}: {
  i: number
  idx: number
  paths: Array<string>
  colorPalette: ColorPalette
  fill?: (i: number) => string
}) {
  return (
    <>
      {i === 4 && (
        <Wave
          key={`wave-${i}-${i + 1}`}
          idx={i}
          path={paths[i]}
          fill={fill?.(i) ?? 'none'}
          transparent
        />
      )}
      <Wave
        key={`wave-${i + 1}`}
        idx={i}
        path={paths[i]}
        fill={fill?.(idx) ?? 'none'}
        transparent={EXCLUDE_ZERO_INDEX.includes(colorPalette) && i === 0}
      />
      {i === 5 && (
        <Wave
          key={`wave${i}-${i + 1}`}
          idx={i}
          path={paths[i]}
          fill={fill?.(i) ?? 'none'}
          transparent
        />
      )}
    </>
  )
}

export default function SvgBuilder({
  height,
  width,
  isPlaying,
  colorPalette,
  paths,
  fill,
  start,
  stop,
}: {
  height: number
  width: number
  isPlaying: boolean
  colorPalette: ColorPalette
  paths: Array<string>
  fill?: (i: number) => string
  start: () => void
  stop: () => void
}) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="max-w-full h-auto">
      {/** @TODO add "translate-y" here ??? */}
      {height && width && (
        <SvgContainer isPlaying={isPlaying} start={start} stop={stop}>
          {Array.from({ length: 10 }).map((_, i) => {
            const idx = i === 4 || i === 5 ? 4.5 : i
            return (
              <WaveBuilder
                key={`wavebuilder-${i + 1}`}
                i={i}
                idx={idx}
                paths={paths}
                colorPalette={colorPalette}
                fill={fill}
              />
            )
          })}
        </SvgContainer>
      )}
    </svg>
  )
}
