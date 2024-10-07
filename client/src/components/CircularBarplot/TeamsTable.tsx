import { QueryResult } from '../../hooks/useData'

export function TeamsTable({ data }: { data?: QueryResult }) {
  return (
    <div>
      {data && data.winsByTeam && (
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.winsByTeam).map(([team, wins]) => (
              <tr key={team}>
                <td>{team}</td>
                <td>{wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
