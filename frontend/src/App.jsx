import { useEffect, useState } from "react";
import StandingsTable from "./components/StandingsTable";
import MatchList from "./components/MatchList";
import { getStandings, getFixtures } from "./services/api";
import "./App.css";

function App() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    Promise.all([getStandings(), getFixtures()])
      .then(([standingsData, fixturesData]) => {
        setStandings(standingsData);
        setFixtures(fixturesData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 className="status-message">Loading La Liga standings...</h2>;
  }

  if (error) {
    return <h2 className="status-message">Error: {error}</h2>;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>La Liga Live Dashboard</h1>
        <p>
          Current standings pulled from your FastAPI backend and PostgreSQL
          database.
        </p>
      </div>

      <StandingsTable standings={standings} />
      <MatchList fixtures={fixtures} />
    </div>
  );
}

export default App;