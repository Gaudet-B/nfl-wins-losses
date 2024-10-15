import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Data, getDataSet, getWinsByTeam, useData } from '../../hooks/useData'
import { OuterContainer, SvgContainer } from './styles'
import {
  FiltersActionButton,
  FiltersLabelType,
  TimelineFilters,
} from './TimelineFilters'
import { BottomLayer, SvgBuilder, TopLayer } from './SvgBuilder'
import PlayButton from '../PlayButton'
import { DEFAULT_TIMEFRAME } from '../../routes/barplot.lazy'

const VIEW_HEIGHT = 1200
const VIEW_WIDTH = 1100

const DEFAULT_ERA = 'Super Bowl Era' as FiltersLabelType

const DEFAULT_DELAY = 300

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
  const mutation = useMutation({
    mutationFn: async ({
      value,
      label,
    }: {
      value: [number, number]
      label?: FiltersLabelType
    }) => {
      if (label) setEra(label)
      if (!label) setEra(DEFAULT_ERA)
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
      setTimeout(() => {
        setLoadingDelay(false)
      }, 1500)
    }

  /** @TODO ??? move to its own hook? */
  const handlePlayTimeline = () => {
    handleTimeframeChange(DEFAULT_TIMEFRAME)
    /**
     * @TODO
     * 1. scroll to SVG
     * 2. make SVG viewbox smaller (based on size of window)
     *    - gonna need a `useRef` here...
     *    - and maybe a smart `useMemo` to prevent unnecessary re-renders
     */
    setTimeout(async () => {
      const diff =
        Math.abs(DEFAULT_TIMEFRAME[1]) - Math.abs(DEFAULT_TIMEFRAME[0])
      let currentTimeFrame = DEFAULT_TIMEFRAME
      for (let i = 0; i < diff; i++) {
        const currentDataSet = getDataSet(currentTimeFrame)
        const winsByTeam = await getWinsByTeam(currentDataSet, DEFAULT_DELAY)
        winsByTeam.forEach((t) => {
          const { id, wins, team } = t
          /** @TODO here is where we use the `id` to 'transition' the element via `d3.selection().transition(transition)` */
          console.log('ID', id)
          console.log('wins', wins)
          console.log('team', team)
        })
      }
    }, 500)
  }

  const { data, isLoading, isPending, isError } = useData(dataSet, 'winsByTeam')
  // console.log('data', data)
  // console.log('isPending', isPending)
  // if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  return (
    <OuterContainer>
      <TimelineFilters
        loadingDelay={loadingDelay}
        showFilters={showFilters}
        timeframe={timeframe}
        // handleShowFilters={handleShowFilters}
        handleTimeframeChange={handleTimeframeChange}
      />
      <FiltersActionButton
        showFilters={showFilters}
        handleShowFilters={handleShowFilters}
      />
      <PlayButton handleClick={handlePlayTimeline} />
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
              isLoading={isLoading}
              loadingDelay={loadingDelay}
              totalGames={data.totalGames}
              winsByTeam={data.winsByTeam}
            />
          )}
        </SvgBuilder>
      </SvgContainer>
    </OuterContainer>
  )
}
