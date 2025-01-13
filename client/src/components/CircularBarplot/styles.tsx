import { PropsWithChildren } from 'react'

export const TEAM_COLOR_MAP = {
  'Arizona Cardinals': '#97233F',
  'Atlanta Falcons': '#A71930',
  'Baltimore Ravens': '#241773',
  'Buffalo Bills': '#00338D',
  'Carolina Panthers': '#0085CA',
  'Chicago Bears': '#0B162A',
  'Cincinnati Bengals': '#FB4F14',
  'Cleveland Browns': '#311D00',
  'Dallas Cowboys': '#041E42',
  'Denver Broncos': '#002244',
  'Detroit Lions': '#0076B6',
  'Green Bay Packers': '#203731',
  'Houston Texans': '#03202F',
  'Indianapolis Colts': '#002C5F',
  'Jacksonville Jaguars': '#006778',
  'Kansas City Chiefs': '#E31837',
  'Las Vegas Raiders': '#000000',
  'Los Angeles Chargers': '#0080C6',
  'Los Angeles Rams': '#002244',
  'Miami Dolphins': '#008E97',
  'Minnesota Vikings': '#4F2683',
  'New England Patriots': '#002244',
  'New Orleans Saints': '#D3BC8D',
  'New York Giants': '#0B2265',
  'New York Jets': '#125740',
  'Philadelphia Eagles': '#004C54',
  'Pittsburgh Steelers': '#FFB612',
  'San Francisco 49ers': '#AA0000',
  'Seattle Seahawks': '#002244',
  'Tampa Bay Buccaneers': '#D50A0A',
  'Tennessee Titans': '#0C2340',
  'Washington Commanders': '#773141',
}

export const STROKE_COLOR_MAP = {
  'Arizona Cardinals': 'group-hover:stroke-[#97233F]',
  'Atlanta Falcons': 'group-hover:stroke-[#A71930]',
  'Baltimore Ravens': 'group-hover:stroke-[#241773]',
  'Buffalo Bills': 'group-hover:stroke-[#00338D]',
  'Carolina Panthers': 'group-hover:stroke-[#0085CA]',
  'Chicago Bears': 'group-hover:stroke-[#0B162A]',
  'Cincinnati Bengals': 'group-hover:stroke-[#FB4F14]',
  'Cleveland Browns': 'group-hover:stroke-[#311D00]',
  'Dallas Cowboys': 'group-hover:stroke-[#041E42]',
  'Denver Broncos': 'group-hover:stroke-[#002244]',
  'Detroit Lions': 'group-hover:stroke-[#0076B6]',
  'Green Bay Packers': 'group-hover:stroke-[#203731]',
  'Houston Texans': 'group-hover:stroke-[#03202F]',
  'Indianapolis Colts': 'group-hover:stroke-[#002C5F]',
  'Jacksonville Jaguars': 'group-hover:stroke-[#006778]',
  'Kansas City Chiefs': 'group-hover:stroke-[#E31837]',
  'Las Vegas Raiders': 'group-hover:stroke-[#000000]',
  'Los Angeles Chargers': 'group-hover:stroke-[#0080C6]',
  'Los Angeles Rams': 'group-hover:stroke-[#002244]',
  'Miami Dolphins': 'group-hover:stroke-[#008E97]',
  'Minnesota Vikings': 'group-hover:stroke-[#4F2683]',
  'New England Patriots': 'group-hover:stroke-[#002244]',
  'New Orleans Saints': 'group-hover:stroke-[#D3BC8D]',
  'New York Giants': 'group-hover:stroke-[#0B2265]',
  'New York Jets': 'group-hover:stroke-[#125740]',
  'Philadelphia Eagles': 'group-hover:stroke-[#004C54]',
  'Pittsburgh Steelers': 'group-hover:stroke-[#FFB612]',
  'San Francisco 49ers': 'group-hover:stroke-[#AA0000]',
  'Seattle Seahawks': 'group-hover:stroke-[#002244]',
  'Tampa Bay Buccaneers': 'group-hover:stroke-[#D50A0A]',
  'Tennessee Titans': 'group-hover:stroke-[#0C2340]',
  'Washington Commanders': 'group-hover:stroke-[#773141]',
}

export const FILL_COLOR_MAP = {
  'Arizona Cardinals': 'group-hover:fill-[#97233F]',
  'Atlanta Falcons': 'group-hover:fill-[#A71930]',
  'Baltimore Ravens': 'group-hover:fill-[#241773]',
  'Buffalo Bills': 'group-hover:fill-[#00338D]',
  'Carolina Panthers': 'group-hover:fill-[#0085CA]',
  'Chicago Bears': 'group-hover:fill-[#0B162A]',
  'Cincinnati Bengals': 'group-hover:fill-[#FB4F14]',
  'Cleveland Browns': 'group-hover:fill-[#311D00]',
  'Dallas Cowboys': 'group-hover:fill-[#041E42]',
  'Denver Broncos': 'group-hover:fill-[#002244]',
  'Detroit Lions': 'group-hover:fill-[#0076B6]',
  'Green Bay Packers': 'group-hover:fill-[#203731]',
  'Houston Texans': 'group-hover:fill-[#03202F]',
  'Indianapolis Colts': 'group-hover:fill-[#002C5F]',
  'Jacksonville Jaguars': 'group-hover:fill-[#006778]',
  'Kansas City Chiefs': 'group-hover:fill-[#E31837]',
  'Las Vegas Raiders': 'group-hover:fill-[#000000]',
  'Los Angeles Chargers': 'group-hover:fill-[#0080C6]',
  'Los Angeles Rams': 'group-hover:fill-[#002244]',
  'Miami Dolphins': 'group-hover:fill-[#008E97]',
  'Minnesota Vikings': 'group-hover:fill-[#4F2683]',
  'New England Patriots': 'group-hover:fill-[#002244]',
  'New Orleans Saints': 'group-hover:fill-[#D3BC8D]',
  'New York Giants': 'group-hover:fill-[#0B2265]',
  'New York Jets': 'group-hover:fill-[#125740]',
  'Philadelphia Eagles': 'group-hover:fill-[#004C54]',
  'Pittsburgh Steelers': 'group-hover:fill-[#FFB612]',
  'San Francisco 49ers': 'group-hover:fill-[#AA0000]',
  'Seattle Seahawks': 'group-hover:fill-[#002244]',
  'Tampa Bay Buccaneers': 'group-hover:fill-[#D50A0A]',
  'Tennessee Titans': 'group-hover:fill-[#0C2340]',
  'Washington Commanders': 'group-hover:fill-[#773141]',
}

export function OuterContainer({ children }: PropsWithChildren) {
  return <div className="w-full flex flex-col items-end">{children}</div>
}

export function SvgContainer({ children }: PropsWithChildren) {
  return (
    <div className="p-3 h-full w-full flex flex-col justify-center translate-y-10">
      {children}
    </div>
  )
}

export function FiltersWrapper({
  children,
  show,
}: PropsWithChildren<{ show?: boolean }>) {
  return (
    <div
      className={`w-full absolute pr-12 flex flex-col items-end transition-transform duration-300 z-10 ${show ? '' : '-translate-y-28 delay-100 ease-out'}`}
    >
      <div
        className={`pb-2 bg-slate-600 border-y-2 border-x-2 border-slate-400 -translate-y-[2px] rounded-bl-lg ${show ? 'shadow-lg' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}

export function FiltersContainer({ children }: PropsWithChildren) {
  return <div className={`flex gap-2 px-2`}>{children}</div>
}

export function LoadingMask({
  isLoading,
  loadingDelay,
  children,
}: PropsWithChildren<{ isLoading: boolean; loadingDelay: boolean }>) {
  return (
    <g
      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${isLoading || loadingDelay ? 'fill-slate-900 opacity-90' : 'fill-none'}`}
    >
      {children}
    </g>
  )
}

export function FiltersTextContainer({
  children,
  show,
}: PropsWithChildren<{ show: boolean }>) {
  return (
    <div
      className={`flex w-full justify-between whitespace-nowrap transition-colors duration-700 rounded-tl-md rounded-tr-md ${show ? 'bg-slate-600' : 'bg-slate-300'}`}
    >
      {children}
    </div>
  )
}

export function FiltersButtonText({
  children,
  show,
}: PropsWithChildren<{ show: boolean }>) {
  return (
    <span
      className={`px-2 py-1 font-semibold ${show ? 'text-slate-400' : 'text-blue-900'}`}
    >
      {children}
    </span>
  )
}

export function FiltersButtonCaret({ show }: { show: boolean }) {
  return (
    <div className={`w-7 h-8 flex flex-col items-center`}>
      <div
        className={`w-full h-full flex items-center justify-center rounded-tr-md transition-colors duration-700 ${show ? 'bg-slate-300 hover:bg-slate-600' : 'bg-slate-600 hover:bg-slate-300'}`}
      >
        <div
          className={`text-start transition-transform duration-200 ease-out ${show ? '-rotate-90 -translate-x-px' : 'rotate-90 translate-x-px'}`}
        >
          <span className="font-bold text-slate-400">{'>'}</span>
        </div>
      </div>
    </div>
  )
}

export function FiltersButtonWrapper({ children }: PropsWithChildren) {
  return (
    <div className="absolute flex flex-col h-9 pr-12 z-20 -translate-y-[36px] items-end">
      {children}
    </div>
  )
}

export function FiltersButtonContainer({
  children,
  show,
}: PropsWithChildren<{ show: boolean }>) {
  return (
    <div
      className={`relative border-2 border-slate-400 w-[186px] rounded-bl-lg rounded-br-lg shadow-lg flex items-center justify-end transition-transform duration-300 ${show ? 'translate-y-[72px]' : '-z-10 -translate-y-[2px] delay-75'}`}
    >
      {children}
    </div>
  )
}

export function PlayButtonContainer({
  children,
  isPlaying,
}: PropsWithChildren<{ isPlaying: boolean }>) {
  return (
    <div
      className={`h-7 w-full flex items-center justify-center rounded-bl-md rounded-br-md group text-green-800 font-semibold hover:bg-green-600 hover:text-white transition-colors duration-300 ${isPlaying ? 'bg-none' : 'bg-slate-300'}`}
    >
      {children}
    </div>
  )
}

export function ButtonImgContainer({ children }: PropsWithChildren) {
  return <div className="flex items-center justify-center">{children}</div>
}

export function ButtonSVGImg() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <text x="-50" y="50" font-size="36" text-anchor="middle" fill="black">
            walk through timeline
          </text> */}
      <g className="">
        <circle
          cx="50"
          cy="50"
          r="45"
          // stroke={"black"}
          stroke-width={7}
          fill="none"
          className="stroke-green-800 group-hover:stroke-white transition-colors duration-300"
        />
        <polygon
          points="40,30 70,50 40,70"
          fill="none"
          // stroke="black"
          strokeWidth={7}
          className="stroke-green-800 group-hover:stroke-white transition-colors duration-300"
        />
      </g>
    </svg>
  )
}

export function ButtonText() {
  return (
    <div className="flex items-end justify-center text-sm">
      <span className="">walk through timeline</span>
    </div>
  )
}
