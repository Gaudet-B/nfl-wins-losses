import { useMemo, useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import CircularBarplot from '../components/CircularBarplot'
import { getDataSet } from '../hooks/useData'
import { useQueryClient } from '@tanstack/react-query'

const DEFAULT_TIMEFRAME = [1966, 2024] as [number, number]

export const Route = createLazyFileRoute('/barplot')({
  component: Barplot,
})
function Barplot() {
  /** @TODO replace this with Jotai if application complexity grows */
  const [timeframe, setTimeframe] = useState(DEFAULT_TIMEFRAME)

  const dataSet = useMemo(() => {
    return getDataSet(timeframe)
  }, [timeframe])

  const queryClient = useQueryClient()
  const handleTimeframe = (timeframe: [number, number]) => {
    setTimeframe(timeframe)
    queryClient.invalidateQueries({ queryKey: ['winsByTeam'] })
  }

  return (
    <CircularBarplot
      dataSet={dataSet}
      timeframe={timeframe}
      setTimeframe={handleTimeframe}
    />
  )
}
