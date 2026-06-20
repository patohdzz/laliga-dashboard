import { useState } from "react";

function MatchList({ fixtures }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFixtures = fixtures.filter((match) => {
    const search = searchTerm.toLowerCase();

    return (
      match.home_team.toLowerCase().includes(search) ||
      match.away_team.toLowerCase().includes(search)
    );
  });

  return (
    <div className="matches-section">
      <h2>Barcelona Fixtures</h2>

      <input
        className="fixture-search"
        type="text"
        placeholder="Search fixtures by team..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div className="match-grid">
        {filteredFixtures.slice(0, 9).map((match) => (
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

      {filteredFixtures.length === 0 && (
        <p className="no-results">No fixtures found.</p>
      )}
    </div>
  );
}

export default MatchList;