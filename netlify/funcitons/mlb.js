export async function handler(event) {

  const type = event.queryStringParameters.type;

  const now = new Date();
  const yyyy = now.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
  const dd = String(yesterday.getDate()).padStart(2, '0');

  const date = `${yyyy}-${mm}-${dd}`;

  try {

    // ---------------- SCORES ----------------
    if (type === "scores") {

      const res = await fetch(
        `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${date}`
      );

      const data = await res.json();

      return json(data);
    }

    // ---------------- STANDINGS ----------------
    if (type === "standings") {

      const res = await fetch(
        `https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=${yyyy}`
      );

      const data = await res.json();

      return json(data);
    }

    // ---------------- LEADERS ----------------
    if (type === "leaders") {

      const res = await fetch(
        `https://statsapi.mlb.com/api/v1/stats/leaders?season=${yyyy}&leaderCategories=homeRuns,battingAverage,rbi,stolenBases,wins,earnedRunAverage,whip`
      );

      const data = await res.json();

      return json(data);
    }

    return json({ error: "Invalid type" });

  } catch (err) {

    return json({ error: err.message });

  }

}

function json(data) {

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  };

}
