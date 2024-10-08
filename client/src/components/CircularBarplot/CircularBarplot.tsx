import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Data, useData } from '../../hooks/useData'
import { OuterContainer, SvgContainer } from './styles'
import {
  FiltersActionButton,
  FiltersLabelType,
  TimelineFilters,
} from './TimelineFilters'
import { BottomLayer, SvgBuilder, TopLayer } from './SvgBuilder'

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

  const queryClient = useQueryClient()

  const handleTimeframeChange =
    (value: [number, number], label?: FiltersLabelType) => () => {
      setLoadingDelay(true)
      if (label) setEra(label)
      if (!label) setEra(DEFAULT_ERA)
      setTimeframe(value)
      queryClient.invalidateQueries({ queryKey: ['winsByTeam'] })
      setTimeout(() => {
        setLoadingDelay(false)
      }, 1500)
    }

  const { data, isPending, isError } = useData(dataSet, 'winsByTeam')
  console.log('data', data)
  console.log('isPending', isPending)
  // if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  return (
    <OuterContainer>
      {/* <FiltersActionButton
        showFilters={showFilters}
        handleShowFilters={handleShowFilters}
      /> */}
      <TimelineFilters
        loadingDelay={loadingDelay}
        showFilters={showFilters}
        timeframe={timeframe}
        handleShowFilters={handleShowFilters}
        handleTimeframeChange={handleTimeframeChange}
      />
      <FiltersActionButton
        showFilters={showFilters}
        handleShowFilters={handleShowFilters}
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
            setTimeframe={setTimeframe}
          />
          {data?.winsByTeam && (
            <BottomLayer
              winsByTeam={data.winsByTeam}
              totalGames={data.totalGames}
            />
          )}
        </SvgBuilder>
      </SvgContainer>
    </OuterContainer>
  )
}
