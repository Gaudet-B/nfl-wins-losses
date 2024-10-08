import * as d3 from 'd3'
import React from 'react'
import { useMemo } from 'react'
import { FILL_COLOR_MAP, STROKE_COLOR_MAP, TEAM_COLOR_MAP } from './styles'
import { WinsByTeam } from '../../hooks/useData'
// import { QueryResult } from '../../hooks/useData'

const SVG_WIDTH = 900 as const

/** @TODO use this for the "storytelling" part */
const MAX_WINS = 550 as const

function TeamsChart({
  winsByTeam,
  totalGames,
}: {
  winsByTeam: WinsByTeam
  totalGames: number
}) {
  /**
   * @TODO handle this differently to achieve animated transitions
   *  1. Have a fixed number of "slots" for teams (based on today's teams)
   *    - in earlier "eras" some teams will just show as "empty" slots
   *    - remove labels for empty slots or let them render as white-on-white?
   *  2. Try to avoid the SVG re-rendering, and instead animate the transitions
   *    - if not possible, try to re-render each one individually (simple loop)
   *      to ensure transitions are animated
   */
  const generateSVG = useMemo(() => {
    const width = SVG_WIDTH
    const height = width
    const margin = 10
    // const innerRadius = width / 6
    const innerRadius = 100
    const outerRadius = width / 2 - margin

    const values = winsByTeam.map((d) => {
      const { id } = d
      const team = d.team as keyof typeof TEAM_COLOR_MAP
      /** @TODO if the scale is "off" remove the constant "0" */
      return { id, team, wins: [0, d.wins] as const }
    })

    // const min = d3.min(values, (d) => d.wins[1]) ?? 0
    const max = d3.max(values, (d) => d.wins[1]) ?? 1

    const x = d3
      .scaleBand()
      .range([0, 2 * Math.PI])
      // .align(0)
      // .padding(0.2)
      .domain(values.map((d) => d.team))

    const y = d3
      .scaleRadial()
      // .domain([0, MAX_WINS])
      .domain([0, max])
      // .domain([min, max])
      .range([innerRadius, outerRadius])

    const arcPathGenerator = d3.arc()

    const allArcs = values.map((d) => {
      const { id } = d
      const startAngle = x(d.team)
      if (startAngle === undefined) return null
      const path = arcPathGenerator({
        startAngle,
        endAngle: startAngle + x.bandwidth(),
        innerRadius: innerRadius,
        // innerRadius: y(d.wins[0]),
        outerRadius: y(d.wins[1]),
      })
      // angle in Radian
      const barAngle = startAngle + x.bandwidth() / 2
      const _checkPosition = () => (barAngle + Math.PI) % (2 * Math.PI)
      const isOnLeftHalf = _checkPosition() < Math.PI
      const isInTopLeftQuadrant = _checkPosition() < Math.PI / 2
      const isInBottomRightQuadrant = _checkPosition() > 1.5 * Math.PI
      // convert Radians to degrees
      const labelRotation = (barAngle * 180) / Math.PI - 90
      const labelXTranslation = y(d.wins[0])
      const labelTransform =
        `rotate(${labelRotation}),translate(${labelXTranslation + y(d.wins[1]) / 4 - 10},0)` as const
      const numberTransform = `rotate(${labelRotation}),translate(${labelXTranslation - 80 + y(d.wins[1])},${
        isInTopLeftQuadrant || isInBottomRightQuadrant ? 20 : -20
      })`

      const splitName = d.team.split(' ')
      const team = splitName.splice(splitName.length - 1, 1)
      const location = splitName.join(' ')

      return (
        <g key={`${id}`} className="group">
          {/** @TODO use Tailwind "groups" for consistent hover behavior */}
          <path
            id={id}
            fill={TEAM_COLOR_MAP[d.team]}
            d={path ?? undefined}
            strokeWidth={2}
            className={`stroke-white group-hover:fill-slate-100 group-hover:scale-125 ${STROKE_COLOR_MAP[d.team]}`}
          />
          <g
            transform={labelTransform}
            stroke="none"
            strokeWidth={1}
            fill="white"
            className={`bg-none opacity-40 ${FILL_COLOR_MAP[d.team]} group-hover:opacity-100`}
            // opacity={0.4}
          >
            <text
              textAnchor={isOnLeftHalf ? 'end' : 'start'}
              alignmentBaseline="middle"
              fontSize={12}
              transform={`translate(0,${isOnLeftHalf ? '10' : '-10'}) ${isOnLeftHalf ? 'rotate(180)' : 'rotate(0)'}`}
            >
              {location}
            </text>
            <text
              textAnchor={isOnLeftHalf ? 'end' : 'start'}
              alignmentBaseline="middle"
              fontSize={24}
              transform={`translate(0,${isOnLeftHalf ? '-10' : '10'}) ${isOnLeftHalf ? 'rotate(180)' : 'rotate(0)'}`}
            >
              {team}
            </text>
          </g>
          <g
            transform={numberTransform}
            stroke={TEAM_COLOR_MAP[d.team]}
            strokeWidth={2}
            fill={TEAM_COLOR_MAP[d.team]}
            className="bg-none"
          >
            <text
              alignmentBaseline="middle"
              fontSize={24}
              transform={
                isInTopLeftQuadrant || isInBottomRightQuadrant
                  ? 'rotate(-90)'
                  : 'rotate(90)'
              }
            >
              {d.wins[1]}
            </text>
          </g>
        </g>
      )
    })
    return { height, width, allArcs }
  }, [winsByTeam])

  const { height, width, allArcs } = generateSVG

  return (
    // <div className="w-2/3">
    <svg
      width={width}
      height={height}
      viewBox={`${-width / 2} ${-height / 1.7} ${width + 20} ${height + 220}`}
      // viewBox={`${width + 200} ${height + 200} ${width * 2} ${height * 2}`}
      // style={{ width: '100%', height: 'auto' }}
    >
      <g fill="#ffff">{allArcs}</g>
    </svg>
    // </div>
  )
}

// export default TeamsChart

/** @TODO bring this back when "storytelling" feature is finished */
const MemoizedTeamsChart = React.memo(TeamsChart, (prevProps, nextProps) => {
  return prevProps.totalGames === nextProps.totalGames
})

/**
 * @TODO
 * 1. do a "traditional" useMutation => invalidateQueries pattern to get the SVG to re-render
 * 2. build "storytelling" feature to animate the transitions
 * 3. add "loading" state to the SVG?
 */

export default MemoizedTeamsChart
