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
      </g>
      <g transform={`translate(0,${LINE_HEIGHT + 80})`}>
        <text>
          {isPending ? 'Loading...' : data && data?.totalGames} Games Played
        </text>
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
    <g transform={`translate(${50},-${0 / 2})`} stroke="black">
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
      viewBox={`${0 / 2} ${0 / 2} ${width} ${height}`}
    >
      <g
        transform={`translate(0,${LINE_HEIGHT})`}
        stroke="black"
        strokeWidth={1}
        fill="black"
      >
        <Title title={title} />
        <Timeframe timeframe={timeframe} />
        <Details data={data} isPending={isPending} width={width} />
      </g>
    </svg>
  )
}
