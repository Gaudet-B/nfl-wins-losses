import { FILL_COLOR_MAP, STROKE_COLOR_MAP, TEAM_COLOR_MAP } from './styles'
import { TeamId, WinsByTeam } from '../../hooks/useData'
import { ArcPaths, Barplots } from '../../hooks/useArcPaths'

// const SVG_WIDTH = 900 as const

// const MAX_WINS = 550 as const

function TeamsChart({
  arcPaths,
  barplots,
  height,
  width,
  winsByTeam,
  winTotals,
  isPlaying,
}: {
  arcPaths: ArcPaths
  barplots: Barplots
  height: number
  width: number
  winsByTeam: WinsByTeam
  winTotals?: WinsByTeam
  isPlaying?: boolean
  // maxWins?: number
}) {
  /**
   * @NEEDS for rendering (should be passed in to the component)
   *    1. max wins (outer radius)
   *    2. inner radius = 0
   *    3. total wins for each team
   */

  /**
   * @IMPLEMENTATION
   *    - have some state variable to track wins (shape???)
   *    - pass that to this (?) component - or a parent?
   *    - have this component (or parent) render the SVG based on those props
   *
   *    * F I R S T   T R Y *
   *    - try adding tailwind animations to the SVG (might need local state var to make it work)
   *
   *    * T H E N   T R Y *
   *    - use the d3.transition() to animate the transitions
   */

  /**
   * @TODO handle this differently to achieve animated transitions
   *  1. Have a fixed number of "slots" for teams (based on today's teams)
   *    - in earlier "eras" some teams will just show as "empty" slots
   *    - remove labels for empty slots or let them render as white-on-white?
   *  2. Try to avoid the SVG re-rendering, and instead animate the transitions
   *    - if not possible, try to re-render each one individually (simple loop)
   *      to ensure transitions are animated
   */

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${-width / 2} ${-height / 1.7} ${width + 20} ${height + 220}`}
    >
      <g fill="#ffff">
        {Object.keys(winsByTeam).map((t) => {
          const barplot = barplots[t as TeamId]
          if (!barplot) return null
          const path = arcPaths[t as TeamId]
          const {
            id,
            location,
            teamName,
            team,
            labelTransform,
            numberTransform,
            isOnLeftHalf,
            isInTopLeftQuadrant,
            isInBottomRightQuadrant,
            wins,
          } = barplot

          const totalWins = winTotals?.[t as TeamId] ?? { wins: 0 }

          return (
            <g key={`${id}`} className="group">
              <path
                id={id}
                fill={TEAM_COLOR_MAP[team]}
                d={path ?? undefined}
                strokeWidth={2}
                className={`stroke-white group-hover:fill-slate-100 group-hover:scale-125 transition-all duration-300 ${STROKE_COLOR_MAP[team]}`}
              />
              <g
                transform={labelTransform}
                stroke="none"
                strokeWidth={1}
                fill="white"
                className={`bg-none opacity-40 ${FILL_COLOR_MAP[team]} group-hover:opacity-100`}
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
                  {teamName}
                </text>
              </g>
              <g
                transform={
                  isPlaying
                    ? numberTransform(totalWins.wins)
                    : numberTransform()
                }
                stroke={TEAM_COLOR_MAP[team]}
                strokeWidth={2}
                fill={TEAM_COLOR_MAP[team]}
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
                  {isPlaying ? totalWins.wins : wins}
                </text>
              </g>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

// const MemoizedTeamsChart = React.memo(TeamsChart, (prevProps, nextProps) => {
//   return prevProps.totalGames === nextProps.totalGames
// })

/**
 * @TODO
 * 1. do a "traditional" useMutation => invalidateQueries pattern to get the SVG to re-render - DONE
 * 2. build "storytelling" feature to animate the transitions - DONE
 * 3. add "loading" state to the SVG?
 */

// export default MemoizedTeamsChart
export default TeamsChart
