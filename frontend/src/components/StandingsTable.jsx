function StandingsTable({ standings }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>Goal Diff</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>
          {standings.map((team) => (
            <tr key={team.id}>
              <td>{team.rank}</td>
              <td>{team.team_name}</td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.drawn}</td>
              <td>{team.lost}</td>
              <td>{team.goals_diff}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StandingsTable;