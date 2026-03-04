const basketballMatches = [
  { home: "Lakers", away: "Warriors", homeScore: 102, awayScore: 99, live: true },
  { home: "Bulls", away: "Celtics", homeScore: 88, awayScore: 90, live: false },
  { home: "Heat", away: "Nets", homeScore: 110, awayScore: 108, live: true }
];

const containerBasket = document.getElementById("matches");

function createMatchCard(match) {
  const card = document.createElement("div");
  card.style.background = "rgba(255,255,255,0.08)";
  card.style.backdropFilter = "blur(10px)";
  card.style.borderRadius = "16px";
  card.style.padding = "20px";
  card.style.marginBottom = "20px";
  card.style.transition = "0.3s";
  card.style.boxShadow = "0 0 20px rgba(0,0,0,0.4)";
  card.style.cursor = "pointer";

  card.onmouseenter = () => { card.style.transform = "scale(1.03)"; card.style.boxShadow = "0 0 25px rgba(0,255,255,0.6)"; };
  card.onmouseleave = () => { card.style.transform = "scale(1)"; card.style.boxShadow = "0 0 20px rgba(0,0,0,0.4)"; };

  const teams = document.createElement("div");
  teams.style.display = "flex";
  teams.style.justifyContent = "space-between";
  teams.style.alignItems = "center";
  teams.style.fontSize = "18px";

  const score = document.createElement("div");
  score.style.fontSize = "22px";
  score.style.fontWeight = "bold";
  score.style.padding = "8px 16px";
  score.style.borderRadius = "10px";
  score.style.background = "rgba(0,0,0,0.4)";
  score.innerText = `${match.homeScore} - ${match.awayScore}`;

  const home = document.createElement("span"); home.innerText = match.home;
  const away = document.createElement("span"); away.innerText = match.away;

  teams.appendChild(home);
  teams.appendChild(score);
  teams.appendChild(away);

  card.appendChild(teams);

  if (match.live) {
    const live = document.createElement("div");
    live.innerText = "LIVE";
    live.style.marginTop = "10px";
    live.style.padding = "5px 12px";
    live.style.borderRadius = "20px";
    live.style.fontSize = "12px";
    live.style.fontWeight = "bold";
    live.style.background = "red";
    live.style.display = "inline-block";
    setInterval(() => { live.style.opacity = live.style.opacity === "0.5" ? "1" : "0.5"; }, 700);
    card.appendChild(live);
  }

  match.scoreElement = score;
  return card;
}

function animateScore(match, team, points) {
  if (team === "home") match.homeScore += points;
  else match.awayScore += points;

  match.scoreElement.innerText = `${match.homeScore} - ${match.awayScore}`;
  match.scoreElement.style.background = "orange";
  match.scoreElement.style.color = "black";

  setTimeout(() => {
    match.scoreElement.style.background = "rgba(0,0,0,0.4)";
    match.scoreElement.style.color = "white";
  }, 800);
}

basketballMatches.forEach(match => containerBasket.appendChild(createMatchCard(match)));


setInterval(() => {
  const liveMatches = basketballMatches.filter(m => m.live);
  if (!liveMatches.length) return;
  const match = liveMatches[Math.floor(Math.random() * liveMatches.length)];
  const team = Math.random() > 0.5 ? "home" : "away";
  const points = Math.random() > 0.5 ? 2 : 3;
  animateScore(match, team, points);
}, 5000);