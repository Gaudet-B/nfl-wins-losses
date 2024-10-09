import { useQuery } from '@tanstack/react-query'
import clonedeep from 'lodash.clonedeep'
import data from '../data/nflData.ts'

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

export type WinsByTeam = Array<{ id: string; team: string; wins: number }>

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

function _getUniqueTeams(
  teamsWins: Array<{ id: string; team: string; wins: number }>
) {
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

function winsByTeamQuery(dataSet: typeof data): Promise<QueryResult> {
  return new Promise((resolve) => {
    const teams = [...new Set(dataSet.map((row) => row.team_home))]
    const teamsWins = [] as Array<{ id: string; team: string; wins: number }>
    teams.forEach((team) => {
      const wins = dataSet.filter(
        (row) =>
          (row.score_home > row.score_away && row.team_home === team) ||
          (row.score_away > row.score_home && row.team_away === team)
      )
      const id = `${team.split(' ').join('_').toLowerCase()}_${wins.length}`
      teamsWins.push({ id, team, wins: wins.length })
    })
    const unsortedWinsByTeam = _getUniqueTeams(teamsWins)
    const winsByTeam = unsortedWinsByTeam.sort((a, b) =>
      a.team.localeCompare(b.team)
    )
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
