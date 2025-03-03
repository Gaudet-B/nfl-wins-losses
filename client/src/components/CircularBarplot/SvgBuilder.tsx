import { PropsWithChildren } from 'react'
import { QueryResult, WinsByTeam } from '../../hooks/useData'
import { ChartInfo, ChartInfoContainer } from './ChartInfo'
import TeamsChart from './TeamsChart'
import { Timeline, TimelineContainer } from './Timeline'
import { FiltersLabelType } from './TimelineFilters'

const DEFAULT_TITLE = 'NFL Wins by team'

export function TopLayerContainer({
  children,
  height,
  width,
}: PropsWithChildren<{ height: number; width: number }>) {
  return <g transform={`translate(-${width / 2},-${height / 2})`}>{children}</g>
}

export function TopLayer({
  era,
  data,
  height,
  width,
  isPending,
  timeframe,
  setTimeframe,
}: {
  era: FiltersLabelType
  data?: QueryResult
  height: number
  width: number
  isPending: boolean
  timeframe: [number, number]
  setTimeframe: (timeframe: [number, number]) => void
}) {
  return (
    <TopLayerContainer height={height} width={width}>
      <ChartInfoContainer height={height} width={width}>
        <ChartInfo
          data={data}
          isPending={isPending}
          timeframe={timeframe}
          title={DEFAULT_TITLE}
        />
      </ChartInfoContainer>
      <TimelineContainer height={height} width={width}>
        <Timeline era={era} timeframe={timeframe} setTimeframe={setTimeframe} />
      </TimelineContainer>
    </TopLayerContainer>
  )
}

export function BottomLayerContainer({ children }: PropsWithChildren) {
  return <g transform={`translate(-450,-550)`}>{children}</g>
}

export function BottomLayer({
  winsByTeam,
  totalGames,
}: {
  winsByTeam: WinsByTeam
  totalGames: number
}) {
  return (
    <BottomLayerContainer>
      <TeamsChart winsByTeam={winsByTeam} totalGames={totalGames} />
    </BottomLayerContainer>
  )
}

export function SvgBuilder({
  children,
  height,
  width,
}: PropsWithChildren<{ height: number; width: number }>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      style={{ width: '100%', height: 'auto' }}
    >
      {children}
    </svg>
  )
}
