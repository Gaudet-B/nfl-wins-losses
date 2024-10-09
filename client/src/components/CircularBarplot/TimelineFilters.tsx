import { FiltersContainer, FiltersWrapper } from './styles'

const FILTERS_GROUPS = [
  [
    { label: 'Super Bowl Era', value: [1966, 2024] as [number, number] },
    { label: 'Offense Era', value: [1978, 2024] as [number, number] },
    { label: 'Free Agency Era', value: [1993, 2024] as [number, number] },
    { label: 'Player Safety Era', value: [2005, 2024] as [number, number] },
  ],
  [
    { label: 'The 70s', value: [1970, 1979] as [number, number] },
    { label: 'The 80s', value: [1980, 1989] as [number, number] },
    { label: 'The 90s', value: [1990, 1999] as [number, number] },
    { label: 'The 2000s', value: [2000, 2009] as [number, number] },
    { label: 'The 2010s', value: [2010, 2019] as [number, number] },
  ],
] as const
const FILTERS_LABELS = FILTERS_GROUPS.flat().map(({ label }) => label)

export type FilterType = (typeof FILTERS_GROUPS)[number][number]
export type FiltersLabelType = (typeof FILTERS_LABELS)[number]

export function FiltersActionButton({
  showFilters,
  handleShowFilters,
}: {
  showFilters: boolean
  handleShowFilters: () => void
}) {
  return (
    <button
      // className="z-10 -translate-y-[42px] pr-12"
      className="z-20 -translate-y-[120px]"
      onClick={handleShowFilters}
    >
      <div
        className={`absolute px-3 py-2 border-2 border-slate-400 rounded-tr-lg rounded-tl-lg whitespace-nowrap -translate-x-full transition-colors duration-700 ${showFilters ? 'bg-slate-600' : 'bg-slate-200'}`}
      >
        <span
          className={`font-semibold ${showFilters ? 'text-slate-400' : 'text-blue-900'}`}
        >
          {'customize timeline'}
        </span>
      </div>
      <div
        className={`relative flex flex-col items-center transition-transform duration-300 -translate-x-full ${showFilters ? 'translate-y-[116px]' : '-z-10 translate-y-[42px]'}`}
      >
        <div
          // className={`px-4 flex items-center justify-center hover:from-slate-200 hover:to-slate-400 border-2 border-slate-400 rounded-br-lg rounded-bl-lg shadow-lg transition-colors duration-500 ${showFilters ? 'bg-gradient-to-br from-slate-500 to-slate-200' : 'bg-gradient-to-br from-slate-100 to-slate-300'}`}
          className={`px-4 flex items-center justify-center border-2 border-slate-400 rounded-br-lg rounded-bl-lg shadow-lg transition-colors duration-700 ${showFilters ? 'bg-slate-200 hover:bg-slate-600' : 'bg-slate-600 hover:bg-slate-200'}`}
        >
          <div
            className={`text-start ${showFilters ? '-rotate-90' : 'rotate-90'}`}
          >
            <span className="font-bold text-slate-400">{'>'}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

function FilterButton({
  label,
  value,
  timeframe,
  handleTimeframeChange,
  loadingDelay,
}: {
  label: FiltersLabelType
  value: [number, number]
  timeframe: [number, number]
  handleTimeframeChange: (
    value: [number, number],
    label?: FiltersLabelType
  ) => () => void
  loadingDelay: boolean
}) {
  return (
    /** @TODO make this reuseable and move to 'src/designsys' */
    <button
      key={label}
      onClick={handleTimeframeChange(value, label)}
      className={`p-1 font-semibold rounded-md items-stretch ${
        timeframe[0] === value[0]
          ? 'text-blue-200 scale-110 underline font-bold'
          : 'text-slate-400'
      }`}
      disabled={loadingDelay}
    >
      {label}
    </button>
  )
}

export function TimelineFilters({
  loadingDelay,
  showFilters,
  timeframe,
  // handleShowFilters,
  handleTimeframeChange,
}: {
  loadingDelay: boolean
  showFilters: boolean
  timeframe: [number, number]
  // handleShowFilters: () => void
  handleTimeframeChange: (
    value: [number, number],
    label?: FiltersLabelType
  ) => () => void
}) {
  return (
    <FiltersWrapper show={showFilters}>
      {FILTERS_GROUPS.map((group) => (
        <FiltersContainer>
          {group.map((filter, i) => {
            const { label, value } = filter
            return (
              <>
                <FilterButton
                  key={label}
                  label={label}
                  value={value}
                  timeframe={timeframe}
                  handleTimeframeChange={handleTimeframeChange}
                  loadingDelay={loadingDelay}
                />
                {i !== group.length - 1 && (
                  <span className="translate-y-1 text-slate-400">&bull;</span>
                )}
              </>
            )
          })}
        </FiltersContainer>
      ))}
    </FiltersWrapper>
  )
}
