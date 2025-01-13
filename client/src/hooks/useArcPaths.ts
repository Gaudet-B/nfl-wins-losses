import * as d3 from 'd3'
import { useState } from 'react'
import { TeamId, WinsByTeam } from './useData'
import { TEAM_COLOR_MAP } from '../components/CircularBarplot/styles'

type ArcPath = string

export type ArcPaths = {
  [key in TeamId]: ArcPath | null
}

type Barplot = {
  id: TeamId
  location: string
  teamName: string
  team: keyof typeof TEAM_COLOR_MAP
  isOnLeftHalf: boolean
  isInTopLeftQuadrant: boolean
  isInBottomRightQuadrant: boolean
  labelTransform: string
  numberTransform: (w?: number) => string
  wins: number
}

export type Barplots = {
  [key in TeamId]: Barplot | null
}

const SVG_WIDTH = 900
const RADIUS_MARGIN = 10

const arcPathGenerator = d3.arc()

const _getValuesArray = (winsByTeam: WinsByTeam) =>
  Object.entries(winsByTeam).map(([, d]) => ({
    id: d.id,
    team: d.team,
    wins: d.wins,
  }))

const _getArcPaths = (
  values: Array<{
    id: TeamId
    team: keyof typeof TEAM_COLOR_MAP
    wins: number
  }>,
  x: d3.ScaleBand<string>,
  y: d3.ScaleRadial<number, number>,
  innerRadius: number
) => {
  const arcPaths = {} as ArcPaths

  values.forEach((d) => {
    const startAngle = x(d.team)
    const path =
      startAngle !== undefined
        ? arcPathGenerator({
            startAngle,
            endAngle: startAngle + x.bandwidth(),
            innerRadius: innerRadius,
            outerRadius: y(d.wins),
          })
        : null
    arcPaths[d.id] = path
  })

  return arcPaths
}

const _getBarplots = (
  values: Array<{
    id: TeamId
    team: keyof typeof TEAM_COLOR_MAP
    wins: number
  }>,
  x: d3.ScaleBand<string>,
  y: d3.ScaleRadial<number, number>
) => {
  const barplots = {} as Barplots
  values.forEach((d) => {
    const startAngle = x(d.team)
    if (startAngle === undefined) return null
    // angle in Radian
    const barAngle = startAngle + x.bandwidth() / 2
    const _checkPosition = () => (barAngle + Math.PI) % (2 * Math.PI)
    const isOnLeftHalf = _checkPosition() < Math.PI
    const isInTopLeftQuadrant = _checkPosition() < Math.PI / 2
    const isInBottomRightQuadrant = _checkPosition() > 1.5 * Math.PI
    // convert Radians to degrees
    const labelRotation = (barAngle * 180) / Math.PI - 90
    // const labelXTranslation = 0
    const labelXTranslation = y(0)
    const labelTransform =
      `rotate(${labelRotation}),translate(${labelXTranslation + y(d.wins) / 4 - 10},0)` as const
    const numberTransform = (w?: number) =>
      `rotate(${labelRotation}),translate(${labelXTranslation - 80 + y(w ?? d.wins)},${
        isInTopLeftQuadrant || isInBottomRightQuadrant ? 20 : -20
      })`

    const splitName = d.team.split(' ')
    const team = splitName.splice(splitName.length - 1, 1)[0]
    const location = splitName.join(' ')

    barplots[d.id] = {
      id: d.id,
      location,
      teamName: team,
      team: d.team,
      isOnLeftHalf,
      isInTopLeftQuadrant,
      isInBottomRightQuadrant,
      labelTransform,
      numberTransform,
      wins: d.wins,
    }
  })
  return barplots
}

export default function useArcPaths(
  totalGamesPlayed: number,
  winsByTeam: WinsByTeam,
  maxWins?: number
) {
  const values = _getValuesArray(winsByTeam)

  const width = SVG_WIDTH
  const height = width
  const margin = RADIUS_MARGIN
  const innerRadius = 100
  const outerRadius = width / 2 - margin

  const max = maxWins ?? d3.max(values, (d) => d.wins) ?? 1

  const x = d3
    .scaleBand()
    .range([0, 2 * Math.PI])
    // .align(0)
    // .padding(0.2)
    .domain(values.map((d) => d.team))

  const y = d3.scaleRadial().domain([0, max]).range([innerRadius, outerRadius])

  const [arcPaths, setArcPaths] = useState<ArcPaths>(
    _getArcPaths(values, x, y, innerRadius)
  )
  const [barplots, setBarplots] = useState<Barplots>(_getBarplots(values, x, y))
  const [totalGames, setTotalGames] = useState(totalGamesPlayed)

  // if we have a new data set, update values, arcPaths, and barplots for re-rendering
  if (totalGames !== totalGamesPlayed) {
    setTotalGames(totalGamesPlayed)
    const newValues = _getValuesArray(winsByTeam)
    const newArcPaths = _getArcPaths(newValues, x, y, innerRadius)
    const newBarplots = _getBarplots(newValues, x, y)
    setArcPaths(newArcPaths)
    setBarplots(newBarplots)
  }

  const updateArcPaths = (winsByTeam: WinsByTeam) => {
    const newValues = _getValuesArray(winsByTeam)
    const newArcPaths = _getArcPaths(newValues, x, y, innerRadius)
    setArcPaths(newArcPaths)
  }

  return { arcPaths, barplots, height, width, updateArcPaths }
}
