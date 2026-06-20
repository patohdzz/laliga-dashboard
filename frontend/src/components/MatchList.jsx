function MatchList({ fixtures }) {
  return (
    <div className="matches-section">
      <h2>FC Barcelona Fixtures</h2>

      <div className="match-grid">
        {fixtures.slice(0, 6).map((match) => (
          <div className="match-card" key={match.id}>
            <p className="match-status">{match.status}</p>

            <div className="match-teams">
              <span>{match.home_team}</span>

              <strong>
                {match.home_goals !== null ? match.home_goals : "-"} -{" "}
                {match.away_goals !== null ? match.away_goals : "-"}
              </strong>

              <span>{match.away_team}</span>
            </div>

            <p className="match-date">
              {new Date(match.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchList;