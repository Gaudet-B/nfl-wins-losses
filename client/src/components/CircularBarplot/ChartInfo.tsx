import { PropsWithChildren } from 'react'
import { QueryResult } from '../../hooks/useData'

const INFO_WIDTH = 300
const INFO_HEIGHT = 400

const LINE_HEIGHT = 20

function Title({ title }: { title: string }) {
  return (
    <g
      alignmentBaseline="middle"
      fontSize={28}
      // stroke="black"
    >
      <text>{title}</text>
    </g>
  )
}

function Timeframe({ timeframe }: { timeframe: [number, number] }) {
  return (
    <g
      transform={`translate(0,${LINE_HEIGHT + 20})`}
      alignmentBaseline="middle"
      fontSize={24}
      stroke="gray"
      fill="gray"
    >
      <text>{`Years ${timeframe[0]} - ${timeframe[1]}`}</text>
    </g>
  )
}

function Details({
  data,
  isPending,
  width,
}: {
  data?: QueryResult
  isPending: boolean
  width: number
}) {
  return (
    <g
      transform={`translate(0,${LINE_HEIGHT})`}
      stroke="none"
      className="font-semibold"
    >
      <g transform={`translate(0,${LINE_HEIGHT + 40})`}>
        <text>
          {isPending ? 'Loading...' : data && data?.totalSeasons} Seasons
        </text>
        {/* <text transform={`translate(${width / 5},0)`}>Seasons</text> */}
      </g>
      <g transform={`translate(0,${LINE_HEIGHT + 60})`}>
        <text>
          {isPending
            ? 'Loading...'
            : data &&
              data.winsByTeam &&
              Object.keys(data.winsByTeam).length}{' '}
          Teams
        </text>
        {/* <text transform={`translate(${width / 5},0)`}>Teams</text> */}
      </g>
      <g transform={`translate(0,${LINE_HEIGHT + 80})`}>
        <text>
          {isPending ? 'Loading...' : data && data?.totalGames} Games Played
        </text>
        {/* <text transform={`translate(${width / 5},0)`}>Games Played</text> */}
      </g>
    </g>
  )
}

export function ChartInfoContainer({
  children,
  height,
  width,
}: PropsWithChildren<{ height: number; width: number }>) {
  return (
    <g
      transform={`translate(${50},-${0 / 2})`}
      // fill="white"
      stroke="black"
    >
      {children}
    </g>
  )
}

export function ChartInfo({
  data,
  isPending,
  timeframe,
  title,
}: {
  data?: QueryResult
  isPending: boolean
  timeframe: [number, number]
  title: string
}) {
  const height = INFO_HEIGHT
  const width = INFO_WIDTH
  return (
    <svg
      width={width}
      height={height}
      // viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      viewBox={`${0 / 2} ${0 / 2} ${width} ${height}`}
      // style={{ width: '100%', height: 'auto' }}
    >
      <g
        transform={`translate(0,${LINE_HEIGHT})`}
        stroke="black"
        strokeWidth={1}
        fill="black"
        // className="bg-none"
      >
        <Title title={title} />
        <Timeframe timeframe={timeframe} />
        <Details data={data} isPending={isPending} width={width} />
      </g>
    </svg>
  )
  // return (
  //   <div className="flex flex-col justify-end">
  //     <h1 className="text-2xl">NFL Wins by team</h1>
  //     <h2 className="text-xl">
  //       Years {timeframe[0]} - {timeframe[1]}
  //     </h2>
  //     <div className="p-2 flex flex-col gap-2">
  //       <div className="p-1 flex gap-2">
  //         <p>Number of seasons</p>
  //         <p>{isPending ? 'Loading...' : data && data?.totalSeasons}</p>
  //       </div>
  //       <div className="p-1 flex gap-2">
  //         <p>Number of teams</p>
  //         <p>
  //           {isPending
  //             ? 'Loading...'
  //             : data && data.winsByTeam && Object.keys(data.winsByTeam).length}
  //         </p>
  //       </div>
  //       <div className="p-1 flex gap-2">
  //         <p>Number of games</p>
  //         <p>{isPending ? 'Loading...' : data && data?.totalGames}</p>
  //       </div>
  //     </div>
  //   </div>
  // )
}
