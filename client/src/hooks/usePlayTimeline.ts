import { useState } from 'react'
import { getWinsByTeam, WinsByTeam } from './useData'
import { getDataSet } from './useData'

const DEFAULT_DELAY = 300
// const DEFAULT_DELAY = 500

export default function usePlayTimeline() {
  const [intervalId, setIntervalId] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentYear, setCurrentYear] = useState<number>()
  const [winTotals, setWinTotals] = useState<WinsByTeam>()

  const updateWinTotals = (winsByTeam: WinsByTeam) => {
    setWinTotals(winsByTeam)
  }

  const playTimeline = async (
    timeframe: [number, number],
    updateArcPaths: (winsByTeam: WinsByTeam) => void
  ) => {
    const start = timeframe[0]
    let year = start + 1
    setCurrentYear(year)
    // const years = timeframe[1] - start

    const dataSet = getDataSet([start, year])
    const winsByTeam = await getWinsByTeam(dataSet)
    updateArcPaths(winsByTeam)
    updateWinTotals(winsByTeam)

    const intervalId = setInterval(async () => {
      const dataSet = getDataSet([start, year])
      const winsByTeam = await getWinsByTeam(dataSet)
      updateArcPaths(winsByTeam)
      updateWinTotals(winsByTeam)
      year++
      setCurrentYear(year)
    }, DEFAULT_DELAY)

    setIntervalId(intervalId)
    setIsPlaying(true)
  }

  const pauseTimeline = () => {
    intervalId && clearInterval(intervalId)
    setIntervalId(null)
    setIsPlaying(false)
  }

  return { currentYear, isPlaying, winTotals, pauseTimeline, playTimeline }
}

/** @TODO review old `d3.transition()` logic before removing */

// export default function usePlayTimeline(
//   handleTimeframeChange: (
//     value: [number, number],
//     label?: FiltersLabelType
//   ) => void
// ) {
//   const width = 900
//   // const height = width
//   const margin = 10
//   const innerRadius = 100
//   const outerRadius = width / 2 - margin
//   const arcPathGenerator = d3.arc()
//   /** @TODO make this dynamic based on active timeframe set by user */
//   handleTimeframeChange(DEFAULT_TIMEFRAME)
//   /**
//    * @TODO
//    * 1. scroll to SVG
//    * 2. make SVG viewbox smaller (based on size of window)
//    *    - gonna need a `useRef` here...
//    *    - and maybe a smart `useMemo` to prevent unnecessary re-renders
//    */
//   setTimeout(async () => {
//     const diff = Math.abs(DEFAULT_TIMEFRAME[1]) - Math.abs(DEFAULT_TIMEFRAME[0])
//     console.log('diff', diff)

//     let currentTimeFrame = DEFAULT_TIMEFRAME
//     for (let i = 0; i < diff; i++) {
//       const end = currentTimeFrame[1] + 1
//       currentTimeFrame = [currentTimeFrame[0], end]
//       const currentDataSet = getDataSet(currentTimeFrame)

//       const winsByTeam = await getWinsByTeam(currentDataSet, DEFAULT_DELAY)

//       const values = winsByTeam.map((d) => {
//         const { id } = d
//         const team = d.team as keyof typeof TEAM_COLOR_MAP
//         /** @TODO if the scale is "off" remove the constant "0" */
//         return { id, team, wins: [0, d.wins] as const }
//       })

//       const max = d3.max(values, (d) => d.wins[1]) ?? 1

//       const x = d3
//         .scaleBand()
//         .range([0, 2 * Math.PI])
//         // .align(0)
//         // .padding(0.2)
//         .domain(values.map((d) => d.team))

//       const y = d3
//         .scaleRadial()
//         // .domain([0, MAX_WINS])
//         .domain([0, max])
//         // .domain([min, max])
//         .range([innerRadius, outerRadius])

//       values.forEach((t) => {
//         const { id, team, wins } = t
//         const startAngle = x(team)
//         if (startAngle === undefined) return null
//         /** @TODO here is where we use the `id` to 'transition' the element via `d3.selection().transition(transition)` */
//         d3.select(id)
//           .transition()
//           .duration(DEFAULT_DELAY)
//           .attr('d', () => {
//             return arcPathGenerator({
//               startAngle,
//               endAngle: startAngle + x.bandwidth(),
//               innerRadius: innerRadius,
//               // innerRadius: y(d.wins[0]),
//               outerRadius: y(wins[1]),
//             })
//           })
//         // console.log('ID', id)
//         // console.log('wins', wins)
//         // console.log('team', team)
//       })
//     }
//   }, 500)
// }
