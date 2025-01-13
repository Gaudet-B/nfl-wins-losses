import { PropsWithChildren } from 'react'
import { QueryResult, WinsByTeam } from '../../hooks/useData'
import { ChartInfo, ChartInfoContainer } from './ChartInfo'
import TeamsChart from './TeamsChart'
import { Timeline, TimelineContainer } from './Timeline'
import { FiltersLabelType } from './TimelineFilters'
import { LoadingMask } from './styles'
import { ArcPaths, Barplots } from '../../hooks/useArcPaths'

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
  currentYear,
  isPlaying,
}: {
  era: FiltersLabelType
  data?: QueryResult
  height: number
  width: number
  isPending: boolean
  timeframe: [number, number]
  currentYear?: number
  isPlaying?: boolean
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
      <TimelineContainer width={width}>
        <Timeline
          era={era}
          timeframe={timeframe}
          currentYear={currentYear}
          isPlaying={isPlaying}
        />
      </TimelineContainer>
    </TopLayerContainer>
  )
}

export function BottomLayerContainer({ children }: PropsWithChildren) {
  return <g transform={`translate(-450,-550)`}>{children}</g>
}

export function BottomLayer({
  isLoading,
  loadingDelay,
  winsByTeam,
  winTotals,
  isPlaying,
  arcPaths,
  barplots,
  height,
  width,
}: {
  isLoading: boolean
  loadingDelay: boolean
  winsByTeam: WinsByTeam
  winTotals?: WinsByTeam
  isPlaying?: boolean
  arcPaths: ArcPaths
  barplots: Barplots
  height: number
  width: number
}) {
  return (
    <BottomLayerContainer>
      <LoadingMask isLoading={isLoading} loadingDelay={loadingDelay}>
        <TeamsChart
          winsByTeam={winsByTeam}
          winTotals={winTotals}
          isPlaying={isPlaying}
          arcPaths={arcPaths}
          barplots={barplots}
          height={height}
          width={width}
        />
      </LoadingMask>
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
