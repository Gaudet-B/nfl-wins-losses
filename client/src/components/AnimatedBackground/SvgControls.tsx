import {
  ControlsPosition,
  COLOR_PALETTE_KEYS,
  ColorPalette,
} from './AnimatedBackground'

const BUTTONS = ['Play', 'Pause', 'Randomize'] as const

const POSITION_MAP = {
  t: 'w-full justify-center',
  b: 'w-full h-full justify-center items-end',
  l: 'h-full items-center',
  r: 'w-full h-full justify-end items-center',
  tl: '',
  tr: 'w-full justify-end',
  bl: 'h-full items-end',
  br: 'w-full h-full items-end',
} as const

function SelectImg() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
    >
      <line
        x1="20"
        y1="20"
        x2="80"
        y2="80"
        stroke="black"
        stroke-width="10"
        stroke-linecap="round"
      />
      <line
        x1="80"
        y1="20"
        x2="20"
        y2="80"
        stroke="black"
        stroke-width="10"
        stroke-linecap="round"
      />
    </svg>
  )
}

export function BgControlsToggle({
  showControls,
  handleClick,
}: {
  showControls: boolean
  handleClick: () => void
}) {
  return (
    <div className="absolute w-[170px] flex justify-between items-center right-0 top-12 p-3 z-50 text-lg text-gray-200 font-semibold">
      <input
        type="checkbox"
        className="w-5 h-5 default:ring-2 rounded bg-gray-300 accent-gray-900"
        checked={showControls}
        onClick={handleClick}
      />
      {/* {showControls && <SelectImg />} */}
      <label>{`${showControls ? 'Hide' : 'Show'} Controls`}</label>
    </div>
  )
}

function Btn({
  isPlaying,
  text,
  handleClick,
}: {
  isPlaying: boolean
  text: (typeof BUTTONS)[number]
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    action: 'play' | 'pause' | 'randomize'
  ) => void
}) {
  if (isPlaying && text === 'Play') return null
  if (!isPlaying && text === 'Pause') return null
  if (isPlaying && text === 'Randomize') return null
  return (
    <button
      onClick={(e) =>
        handleClick(e, text.toLowerCase() as 'play' | 'pause' | 'randomize')
      }
      className={`p-2 rounded-md ${text === 'Pause' ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}`}
    >
      {text}
    </button>
  )
}

function Dropdown({
  colorPalette,
  handleColorChange,
}: {
  colorPalette: string
  handleColorChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <select
      onChange={handleColorChange}
      className="p-2 rounded-md bg-blue-500 text-white"
    >
      {COLOR_PALETTE_KEYS.map((palette) => (
        <option
          key={palette}
          value={palette}
          selected={palette === colorPalette}
        >
          {palette}
        </option>
      ))}
    </select>
  )
}

export default function SvgControls({
  colorPalette,
  isPlaying,
  onPlay,
  onPause,
  onRandomize,
  handleColorChange,
  position = 'tl',
}: {
  colorPalette: ColorPalette
  isPlaying: boolean
  position: ControlsPosition
  onPlay: () => void
  onPause: () => void
  onRandomize: () => void
  handleColorChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: 'play' | 'pause' | 'randomize'
  ) => {
    e.preventDefault()
    if (action === 'play') onPlay()
    if (action === 'pause') onPause()
    if (action === 'randomize') onRandomize()
  }

  return (
    <div className={`absolute flex ${POSITION_MAP[position]}`}>
      <div className="p-4 flex gap-2">
        {/** @TODO make a standard Button */}
        {BUTTONS.map((text, i) => (
          <Btn
            text={text}
            isPlaying={isPlaying}
            handleClick={handleClick}
            key={`control-btn-${i + 1}-(${text})`}
          />
        ))}
        <Dropdown
          colorPalette={colorPalette}
          handleColorChange={handleColorChange}
        />
      </div>
    </div>
  )
}
