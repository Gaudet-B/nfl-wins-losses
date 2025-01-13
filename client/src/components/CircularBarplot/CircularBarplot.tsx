import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Data, useData, WinsByTeam } from '../../hooks/useData'
import { OuterContainer, SvgContainer } from './styles'
import {
  FiltersActionButton,
  FiltersLabelType,
  TimelineFilters,
} from './TimelineFilters'
import { BottomLayer, SvgBuilder, TopLayer } from './SvgBuilder'
import useArcPaths from '../../hooks/useArcPaths'
import usePlayTimeline from '../../hooks/usePlayTimeline'

const VIEW_HEIGHT = 1200
const VIEW_WIDTH = 1100

const DEFAULT_ERA = 'Super Bowl Era' as FiltersLabelType

export function CircularBarplot({
  dataSet,
  timeframe,
  setTimeframe,
}: {
  dataSet: Data
  timeframe: [number, number]
  setTimeframe: (timeframe: [number, number]) => void
}) {
  const [era, setEra] = useState(DEFAULT_ERA)
  const [loadingDelay, setLoadingDelay] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const handleShowFilters = () => setShowFilters((prev) => !prev)

  const { data, isLoading, isPending, isError } = useData(dataSet, 'winsByTeam')

  const { totalGames, winsByTeam } = data ?? {}

  const { arcPaths, barplots, height, width, updateArcPaths } = useArcPaths(
    totalGames ?? 0,
    winsByTeam ?? ({} as WinsByTeam)
    // maxWins
  )

  const { currentYear, isPlaying, winTotals, pauseTimeline, playTimeline } =
    usePlayTimeline()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({
      value,
      label,
    }: {
      value: [number, number]
      label?: FiltersLabelType
    }) => {
      if (label) setEra(label)
      // if (!label) setEra(DEFAULT_ERA)
      // if (!label) setEra("")
      setTimeframe(value)
      await new Promise((resolve) => setTimeout(resolve, 200))
    },
    onMutate: async () => {
      queryClient.invalidateQueries({ queryKey: ['winsByTeam'] })
      setTimeout(() => {
        setLoadingDelay(false)
      }, 500)
    },
    onError: (error) => {
      alert('An error occurred: ' + error.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['winsByTeam'] })
    },
  })

  const handleTimeframeChange =
    (value: [number, number], label?: FiltersLabelType) => () => {
      setLoadingDelay(true)
      mutation.mutate({ value, label })
    }

  const handlePauseTimeline = () => pauseTimeline()

  const handlePlayTimeline = () => playTimeline(timeframe, updateArcPaths)

  // if (isPending) return <div>Loading...</div>

  if (isError) return <div>Error...</div>

  return (
    <OuterContainer>
      <TimelineFilters
        loadingDelay={loadingDelay}
        showFilters={showFilters}
        timeframe={timeframe}
        handleTimeframeChange={handleTimeframeChange}
      />
      <FiltersActionButton
        showFilters={showFilters}
        handleShowFilters={handleShowFilters}
        handlePlayTimeline={handlePlayTimeline}
      />
      <SvgContainer>
        <SvgBuilder height={VIEW_HEIGHT} width={VIEW_WIDTH}>
          <TopLayer
            era={era}
            data={data}
            height={VIEW_HEIGHT}
            width={VIEW_WIDTH}
            isPending={isPending}
            timeframe={timeframe}
            currentYear={currentYear}
            isPlaying={isPlaying}
          />
          {data?.winsByTeam && (
            <BottomLayer
              isLoading={isLoading}
              loadingDelay={loadingDelay}
              arcPaths={arcPaths}
              barplots={barplots}
              height={height}
              width={width}
              winsByTeam={data.winsByTeam}
              winTotals={winTotals}
              isPlaying={isPlaying}
            />
          )}
        </SvgBuilder>
      </SvgContainer>
    </OuterContainer>
  )
}
