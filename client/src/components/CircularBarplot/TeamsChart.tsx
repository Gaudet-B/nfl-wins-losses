import * as d3 from 'd3'
import { useMemo } from 'react'
// import { QueryResult } from '../../hooks/useData'

const SVG_WIDTH = 900 as const

const TEAM_COLOR_MAP = {
  'Arizona Cardinals': '#97233F',
  'Atlanta Falcons': '#A71930',
  'Baltimore Ravens': '#241773',
  'Buffalo Bills': '#00338D',
  'Carolina Panthers': '#0085CA',
  'Chicago Bears': '#0B162A',
  'Cincinnati Bengals': '#FB4F14',
  'Cleveland Browns': '#311D00',
  'Dallas Cowboys': '#041E42',
  'Denver Broncos': '#002244',
  'Detroit Lions': '#0076B6',
  'Green Bay Packers': '#203731',
  'Houston Texans': '#03202F',
  'Indianapolis Colts': '#002C5F',
  'Jacksonville Jaguars': '#006778',
  'Kansas City Chiefs': '#E31837',
  'Las Vegas Raiders': '#000000',
  'Los Angeles Chargers': '#0080C6',
  'Los Angeles Rams': '#002244',
  'Miami Dolphins': '#008E97',
  'Minnesota Vikings': '#4F2683',
  'New England Patriots': '#002244',
  'New Orleans Saints': '#D3BC8D',
  'New York Giants': '#0B2265',
  'New York Jets': '#125740',
  'Philadelphia Eagles': '#004C54',
  'Pittsburgh Steelers': '#FFB612',
  'San Francisco 49ers': '#AA0000',
  'Seattle Seahawks': '#002244',
  'Tampa Bay Buccaneers': '#D50A0A',
  'Tennessee Titans': '#0C2340',
  'Washington Commanders': '#773141',
}

// const TEMP_COLORS = [
//   '#f00',
//   '#0f0',
//   '#00f',
//   '#ff0',
//   '#f0f',
//   '#0ff',
//   '#f80',
//   '#f08',
//   '#0f8',
//   '#08f',
//   '#80f',
//   '#8f0',
//   '#f00',
//   '#0f0',
//   '#00f',
//   '#ff0',
//   '#f0f',
//   '#0ff',
//   '#f80',
//   '#f08',
//   '#0f8',
//   '#08f',
//   '#80f',
//   '#8f0',
//   '#f00',
//   '#0f0',
//   '#00f',
//   '#ff0',
//   '#f0f',
//   '#0ff',
//   '#f80',
//   '#f08',
//   '#0f8',
//   '#08f',
//   '#80f',
//   '#8f0',
// ]

export function TeamsChart({
  winsByTeam,
}: {
  winsByTeam: Array<{ team: string; wins: number }>
}) {
  const generateSVG = useMemo(() => {
    const width = SVG_WIDTH
    const height = width
    const margin = 10
    // const innerRadius = width / 6
    const innerRadius = 100
    const outerRadius = width / 2 - margin

    const values = winsByTeam.map((d) => {
      const team = d.team as keyof typeof TEAM_COLOR_MAP
      /** @TODO if the scale is "off" remove the constant "0" */
      return { team, wins: [0, d.wins] as const }
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
      .domain([0, max])
      // .domain([min, max])
      .range([innerRadius, outerRadius])

    const arcPathGenerator = d3.arc()

    const allArcs = values.map((d, i) => {
      const startAngle = x(d.team)
      if (startAngle === undefined) return null
      const path = arcPathGenerator({
        startAngle,
        endAngle: startAngle + x.bandwidth(),
        innerRadius: innerRadius,
        // innerRadius: y(d.wins[0]),
        outerRadius: y(d.wins[1]),
      })
      console.log('team', d.team)
      console.log('outerRadius', y(d.wins[1]))
      // angle in Radian
      const barAngle = startAngle + x.bandwidth() / 2
      const _checkPosition = () => (barAngle + Math.PI) % (2 * Math.PI)
      const isOnLeftHalf = _checkPosition() < Math.PI
      const isInTopLeftQuadrant = _checkPosition() < Math.PI / 2
      const isInBottomRightQuadrant = _checkPosition() > 1.5 * Math.PI
      // convert Radians to degrees
      const labelRotation = (barAngle * 180) / Math.PI - 90
      const labelXTranslation = y(d.wins[0])
      const labelTransform = `rotate(${labelRotation}),translate(${labelXTranslation + y(d.wins[1]) / 3 - 10},0)`
      const numberTransform = `rotate(${labelRotation}),translate(${labelXTranslation - 80 + y(d.wins[1])},${
        isInTopLeftQuadrant || isInBottomRightQuadrant ? 20 : -20
      })`

      const splitName = d.team.split(' ')
      const team = splitName.splice(splitName.length - 1, 1)
      // console.log('team', team)
      const location = splitName.join(' ')
      // console.log('location', location)

      return (
        <g key={`${i}`}>
          <path
            fill={TEAM_COLOR_MAP[d.team]}
            d={path ?? undefined}
            className={'hover:fill-gray-500 hover:stroke-gray-900'}
          />
          <g
            transform={labelTransform}
            stroke="none"
            strokeWidth={1}
            fill="white"
            className="bg-none"
            opacity={0.4}
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
            stroke="black"
            strokeWidth={1}
            fill="black"
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
    <div className="w-2/3">
      <svg
        width={width}
        height={height}
        viewBox={`${-width / 2} ${-height / 2} ${width + 10} ${height}`}
        style={{ width: '100%', height: 'auto' }}
      >
        <g fill="#ffff">{allArcs}</g>
      </svg>
    </div>
  )
}
