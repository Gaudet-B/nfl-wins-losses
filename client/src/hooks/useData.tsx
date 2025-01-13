import { useQuery } from '@tanstack/react-query'
import clonedeep from 'lodash.clonedeep'
import data from '../data/nflData.ts'
import { TEAM_COLOR_MAP } from '../components/CircularBarplot/styles.tsx'

const QUERY_MAP = {
  default: defaultQuery,
  winsByTeam: winsByTeamQuery,
} as const

const TEAMS_TO_COMBINE = [
  ['Los Angeles Rams', 'St. Louis Rams'],
  ['Washington Commanders', 'Washington Football Team', 'Washington Redskins'],
  ['Las Vegas Raiders', 'Oakland Raiders', 'Los Angeles Raiders'],
  ['Tennessee Titans', 'Houston Oilers', 'Tennessee Oilers'],
  ['Los Angeles Chargers', 'San Diego Chargers'],
  ['Indianapolis Colts', 'Baltimore Colts'],
  ['Arizona Cardinals', 'St. Louis Cardinals', 'Phoenix Cardinals'],
  ['New England Patriots', 'Boston Patriots'],
]

export type TeamId =
  | 'arizona_cardinals_wins'
  | 'atlanta_falcons_wins'
  | 'baltimore_ravens_wins'
  | 'buffalo_bills_wins'
  | 'carolina_panthers_wins'
  | 'chicago_bears_wins'
  | 'cincinnati_bengals_wins'
  | 'cleveland_browns_wins'
  | 'dallas_cowboys_wins'
  | 'denver_broncos_wins'
  | 'detroit_lions_wins'
  | 'green_bay_packers_wins'
  | 'houston_texans_wins'
  | 'indianapolis_colts_wins'
  | 'jacksonville_jaguars_wins'
  | 'kansas_city_chiefs_wins'
  | 'las_vegas_raiders_wins'
  | 'los_angeles_chargers_wins'
  | 'los_angeles_rams_wins'
  | 'miami_dolphins_wins'
  | 'minnesota_vikings_wins'
  | 'new_england_patriots_wins'
  | 'new_orleans_saints_wins'
  | 'new_york_giants_wins'
  | 'new_york_jets_wins'
  | 'philadelphia_eagles_wins'
  | 'pittsburgh_steelers_wins'
  | 'san_francisco_49ers_wins'
  | 'seattle_seahawks_wins'
  | 'tampa_bay_buccaneers_wins'
  | 'tennessee_titans_wins'
  | 'washington_commanders_wins'

export type TeamWins = {
  id: TeamId
  team: keyof typeof TEAM_COLOR_MAP
  wins: number
}

export type WinsByTeam = {
  [key in TeamId]: TeamWins
}

export type QueryResult = {
  totalSeasons: number
  totalGames: number
  winsByTeam?: WinsByTeam
}

function _getDefaultInfo(dataSet: typeof data) {
  const seasons = [...new Set(dataSet.map((row) => row.schedule_season))]
  const totalSeasons = seasons.length
  const totalGames = dataSet.length
  return { totalSeasons, totalGames }
}

function defaultQuery(dataSet: typeof data): Promise<QueryResult> {
  return new Promise((resolve) => {
    const { totalSeasons, totalGames } = _getDefaultInfo(dataSet)
    resolve({ totalSeasons, totalGames })
  })
}

/** @TODO this isn't working as expected - it's actually filtering out teams instead of combining them (maybe because of the `teams[0]` on line 95?) */
function _getUniqueTeams(teamsWins: Array<TeamWins>) {
  const uniqueTeams = clonedeep(teamsWins)
  TEAMS_TO_COMBINE.forEach((teams) => {
    let index = uniqueTeams.findIndex((t) => t.team === teams[0])
    let team = { ...uniqueTeams[index] }
    let wins = team.wins
    for (let i = 1; i < teams.length; i++) {
      const teamToCombine = teams[i]
      const teamIndex = uniqueTeams.findIndex((t) => t.team === teamToCombine)
      if (teamIndex !== -1) {
        wins += uniqueTeams[teamIndex].wins
        uniqueTeams.splice(teamIndex, 1)
        index = uniqueTeams.findIndex((t) => t.team === teams[0])
      }
    }
    team.wins = wins
    uniqueTeams[index] = team
    team = { ...uniqueTeams[index] }
  })
  return uniqueTeams
}

function _getWinsByTeam(dataSet: typeof data) {
  const teams = [...new Set(dataSet.map((row) => row.team_home))] as Array<
    keyof typeof TEAM_COLOR_MAP
  >
  const teamsWins = [] as Array<TeamWins>
  teams.forEach((team) => {
    const wins = dataSet.filter(
      (row) =>
        (row.score_home > row.score_away && row.team_home === team) ||
        (row.score_away > row.score_home && row.team_away === team)
    )
    const id = `${team.split(' ').join('_').toLowerCase()}_wins` as TeamId
    teamsWins.push({ id, team, wins: wins.length })
  })
  const unsortedWinsByTeam = _getUniqueTeams(teamsWins)
  const winsByTeam = {} as WinsByTeam
  unsortedWinsByTeam.forEach((team) => {
    winsByTeam[team.id] = team
  })
  return winsByTeam
}

export async function getWinsByTeam(
  dataSet: typeof data,
  delay = 0
): Promise<WinsByTeam> {
  return new Promise((resolve) => {
    const winsByTeam = _getWinsByTeam(dataSet)
    setTimeout(() => {
      resolve(winsByTeam)
    }, delay)
  })
}

function winsByTeamQuery(dataSet: typeof data): Promise<QueryResult> {
  return new Promise((resolve) => {
    const winsByTeam = _getWinsByTeam(dataSet)
    const { totalSeasons, totalGames } = _getDefaultInfo(dataSet)
    resolve({ totalSeasons, totalGames, winsByTeam })
  })
}

/** @TODO need to adjust this to handle January games */
export function getDataSet(timeframe: [number, number]) {
  return data.filter(
    (row) =>
      parseInt(row.schedule_season) >= timeframe[0] &&
      parseInt(row.schedule_season) <= timeframe[1]
  )
}

export type Data = typeof data

export function useData(
  dataSet: Data,
  queryKey: keyof typeof QUERY_MAP = 'default'
) {
  const queryFn = QUERY_MAP[queryKey]
  return useQuery({ queryKey: [queryKey], queryFn: () => queryFn(dataSet) })
}
