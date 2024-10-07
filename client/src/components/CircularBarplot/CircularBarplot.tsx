import { useState } from 'react'
import { useData } from '../../hooks/useData'
// import { TeamsTable } from './TeamsTable'
import { TeamsChart } from './TeamsChart'
import { Timeline } from './Timeline'

const DEFAULT_TIMEFRAME = [1966, 2024] as [number, number]

export function CircularBarplot() {
  const [timeframe, setTimeframe] = useState(DEFAULT_TIMEFRAME)
  const { data, isPending, isError } = useData(timeframe, 'winsByTeam')
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex gap-4">
        <div className="flex-1">
          <h1 className="text-2xl">NFL Wins by team</h1>
          <h2 className="text-xl">
            Years {timeframe[0]} - {timeframe[1]}
          </h2>
          <div className="w-1/2 p-2 flex flex-col gap-2">
            <div className="p-1 flex gap-2">
              <p>Number of seasons</p>
              <p>{data && data?.totalSeasons}</p>
            </div>
            <div className="p-1 flex gap-2">
              <p>Number of teams</p>
              <p>
                {data && data.winsByTeam && Object.keys(data.winsByTeam).length}
              </p>
            </div>
            <div className="p-1 flex gap-2">
              <p>Number of games</p>
              <p>{data && data?.totalGames}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 p-3 h-full flex justify-center">
          <Timeline timeframe={timeframe} />
        </div>
      </div>
      {/* <TeamsTable data={data} /> */}
      {data && data.winsByTeam && <TeamsChart winsByTeam={data.winsByTeam} />}
    </div>
  )
}
