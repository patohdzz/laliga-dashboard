const API_BASE_URL = "http://127.0.0.1:8000";

export async function getStandings() {
  const response = await fetch(`${API_BASE_URL}/standings`);

  if (!response.ok) {
    throw new Error("Failed to fetch standings");
  }

  return response.json();
}

export async function getFixtures() {
  const response = await fetch(`${API_BASE_URL}/fixtures`);

  if (!response.ok) {
    throw new Error("Failed to fetch fixtures");
  }

  return response.json();
}