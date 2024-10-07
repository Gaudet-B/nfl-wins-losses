import * as d3 from 'd3'
import { useMemo } from 'react'

/** @TODO this can be made dynamic by attaching a ref to the parent element */
const SVG_WIDTH = 500 as const
const SVG_HEIGHT = 100 as const

const FIRST_SEASON = 1966 as const
const LAST_SEASON = 2024 as const
const NUMBER_OF_SEASONS = 59 as const

const startDate = new Date(FIRST_SEASON, 0, 1)
// add +1 to 'LAST_SEASON' for Jan 1st 2025
const endDate = new Date(LAST_SEASON + 1, 0, 1)

// this will never change so it is defined outside of the component
const timeScale = d3.scaleTime().domain([startDate, endDate]).range([0, 1])

export function Timeline({ timeframe }: { timeframe: [number, number] }) {
  const getActiveTimeframe = useMemo(() => {
    const [start, end] = timeframe
    const startDate = new Date(start, 0, 1)
    const endDate = new Date(end + 1, 0, 1)
    const activeTimeframe = [startDate, endDate]
    const activeStart = timeScale(activeTimeframe[0])
    const activeEnd = timeScale(activeTimeframe[1])
    return { activeTimeframe, activeStart, activeEnd }
  }, [timeframe])

  const generateSVG = useMemo(() => {
    const width = SVG_WIDTH
    const height = SVG_HEIGHT
    // const margin = 10

    const timelineTicks = timeScale.ticks(NUMBER_OF_SEASONS).map((date, i) => {
      const year = date.getFullYear()
      const isDecade = year % 10 === 0

      const x = timeScale(date) * (width - 10) + 5
      const y = isDecade ? 12 : 6

      const color = isDecade ? 'black' : 'gray'

      date = new Date(date.setFullYear(date.getFullYear() + 1))
      return (
        <g key={i} opacity={1}>
          <path
            d={`M${x},${height / 2 - 4} V ${y + height / 2} Z`}
            stroke={color}
            strokeWidth={1}
          />
          {isDecade && (
            <text x={x - 13} y={height / 2 + 26} fontSize={12} fill={color}>
              {year}
            </text>
          )}
        </g>
      )
    })

    return { height, width, timelineTicks }
  }, [])

  const { height, width, timelineTicks } = generateSVG
  const { activeStart, activeEnd } = getActiveTimeframe
  console.log('activeStart', activeStart)
  console.log('activeEnd', activeEnd)

  return (
    <svg width={width} height={height}>
      <g fill="none">
        <path
          d={`M 3,${height / 2} H ${width - 3} Z`}
          stroke="black"
          strokeWidth={1}
        />
        <path
          d={`M ${activeStart * (width - 10) + 5},${height / 2 - 4} V ${height / 2 + 4} H ${activeEnd * (width - 10) + 5} V ${height / 2 - 4} Z`}
          stroke="none"
          fill="red"
          opacity={0.5}
        />
        {timelineTicks}
      </g>
    </svg>
  )
}
