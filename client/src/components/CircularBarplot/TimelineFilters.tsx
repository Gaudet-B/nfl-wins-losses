import { PropsWithChildren } from 'react'
import {
  FiltersButtonCaret,
  FiltersButtonContainer,
  FiltersButtonText,
  FiltersButtonWrapper,
  FiltersContainer,
  FiltersTextContainer,
  FiltersWrapper,
} from './styles'
import PlayButton from './PlayButton'

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

function ShowFiltersButton({
  children,
  onClick,
}: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button
      className="h-9 w-[186px] border-2 border-slate-400 rounded-tr-lg rounded-tl-lg"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function FiltersActionButton({
  showFilters,
  handlePlayTimeline,
  handleShowFilters,
}: {
  showFilters: boolean
  handlePlayTimeline: () => void
  handleShowFilters: () => void
}) {
  return (
    <FiltersButtonWrapper>
      <ShowFiltersButton onClick={handleShowFilters}>
        <FiltersTextContainer show={showFilters}>
          <FiltersButtonText show={showFilters}>
            {'customize timeline'}
          </FiltersButtonText>
          <FiltersButtonCaret show={showFilters} />
        </FiltersTextContainer>
      </ShowFiltersButton>
      <FiltersButtonContainer show={showFilters}>
        <PlayButton handleClick={handlePlayTimeline} isPlaying={false} />
        {/* <FiltersButtonCaret show={showFilters} /> */}
      </FiltersButtonContainer>
    </FiltersButtonWrapper>
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
          ? 'text-sky-300 scale-110 underline font-bold'
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
  handleTimeframeChange,
}: {
  loadingDelay: boolean
  showFilters: boolean
  timeframe: [number, number]
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
