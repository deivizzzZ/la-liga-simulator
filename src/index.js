class Team {
  constructor(name, logo) {
    this.name = name;
    this.logo = logo;
    this.matches = [];
    this.points = 0;
    this.wins = 0;
    this.ties = 0;
    this.loses = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
  }

  get showName() {
    return this.name;
  }

  get showLogo() {
    return this.logo;
  }

  get showPoints() {
    return this.points;
  }

  get showWins() {
    return this.wins;
  }

  get showTies() {
    return this.ties;
  }

  get showLoses() {
    return this.loses;
  }

  get showGoalsFor() {
    return this.goalsFor;
  }

  get showGoalsAgainst() {
    return this.goalsAgainst;
  }

  addWin() {
    this.wins++;
  }

  addTie() {
    this.ties++;
  }

  addLose() {
    this.loses++;
  }

  addGoalsFor(goals) {
    this.goalsFor += goals;
  }

  addGoalsAgainst(goals) {
    this.goalsAgainst += goals;
  }

  addPoints(points) {
    this.points += points;
  }
}

class Match {
  constructor(local, visitor) {
    this.local = local;
    this.visitor = visitor;
    this.localGoals = 0;
    this.visitorGoals = 0;
  }

  get showLocal() {
    return this.local;
  }

  get showVisitor() {
    return this.visitor;
  }

  get addLocalGoals() {
    const goals = goalGen();
    this.localGoals = goals;
    this.local.addGoalsFor(goals);
    this.visitor.addGoalsAgainst(goals);
    return this.localGoals;
  }

  get addVisitorGoals() {
    const goals = goalGen();
    this.visitorGoals = goals;
    this.visitor.addGoalsFor(goals);
    this.local.addGoalsAgainst(goals);
    return this.visitorGoals;
  }

  checkWinner() {
    if (this.localGoals > this.visitorGoals) {
      this.local.addWin();
      this.local.addPoints(3);
      this.visitor.addLose();
    } else if (this.localGoals < this.visitorGoals) {
      this.local.addLose();
      this.visitor.addWin();
      this.visitor.addPoints(3);
    } else {
      this.local.addTie();
      this.local.addPoints(1);
      this.visitor.addTie();
      this.visitor.addPoints(1);
    }
  }
}

class Week {
  constructor(matchArray) {
    this.matches = matchArray;
  }
}

const TEAMS = [
  new Team("Alavés", "./img/alaves.png"),
  new Team("Athletic", "./img/athletic.png"),
  new Team("Atlético Madrid", "./img/atletico.png"),
  new Team("Barcelona", "./img/barcelona.png"),
  new Team("Betis", "./img/betis.png"),
  new Team("Cádiz", "./img/cadiz.png"),
  new Team("Celta de Vigo", "./img/celta.png"),
  new Team("Elche C.F.", "./img/elche.png"),
  new Team("RCD Espanyol", "./img/espanyol.png"),
  new Team("Getafe", "./img/getafe.png"),
  new Team("Granada", "./img/granada.png"),
  new Team("Levante", "./img/levante.png"),
  new Team("Real Madrid", "./img/madrid.png"),
  new Team("R.C.D. Mallorca", "./img/mallorca.png"),
  new Team("Osasuna", "./img/osasuna.png"),
  new Team("Rayo Vallecano", "./img/rayo.png"),
  new Team("Real Sociedad", "./img/real.png"),
  new Team("Sevilla", "./img/sevilla.png"),
  new Team("Valencia C.F.", "./img/valencia.png"),
  new Team("Villarreal", "./img/villarreal.png"),
];

const randomList = _.shuffle(TEAMS);

const table = document.querySelector("table");
const scoreboard = document.querySelector(".scoreboard");

// generate matches calendar
function fixture(ts) {
  const mc = ts.length - 1;
  let sp = 0;
  let tm = 0;
  return ts.map((t, i, a) => (a.slice(i + 1)
    .forEach(function(_, j, b) {
      sp = (2 * i + j) % mc;
      tm = (j + mc - i - 1) % (mc - i) + i + 1;
      t.matches[sp] = a[tm].id;
      a[tm].matches[sp] = t.id;
    })
  , t));
}
const tc = 20;
const teams = Array(tc).fill().map((_, i) => ({ id: "Team_" + i, matches: Array(tc - 1) }));
const result = fixture(teams);
console.log(teams);

// fill classification board
function fillTable(array) {
  for (const team in array) {
    // ROW
    const tr = document.createElement("tr");
    table.appendChild(tr);
    // POSITION
    const tdNumber = document.createElement("td");
    const position = Number(team) + 1;
    tdNumber.innerText = position;
    tr.appendChild(tdNumber);
    // LOGO
    const tdLogo = document.createElement("td");
    tdLogo.className = "logo";
    tr.appendChild(tdLogo);
    const imgLogo = document.createElement("img");
    imgLogo.src = array[team].showLogo;
    tdLogo.appendChild(imgLogo);
    // NAME
    const tdName = document.createElement("td");
    tdName.className = "name";
    tdName.innerText = array[team].showName;
    tr.appendChild(tdName);
    // WINS
    const tdWins = document.createElement("td");
    tdWins.className = "wins";
    tdWins.innerText = array[team].showWins;
    tr.appendChild(tdWins);
    // TIES
    const tdTies = document.createElement("td");
    tdTies.className = "ties";
    tdTies.innerText = array[team].showTies;
    tr.appendChild(tdTies);
    // LOSES
    const tdLoses = document.createElement("td");
    tdLoses.className = "loses";
    tdLoses.innerText = array[team].showLoses;
    tr.appendChild(tdLoses);
    // GOALS FOR
    const tdGoalsFor = document.createElement("td");
    tdGoalsFor.className = "goals-for";
    tdGoalsFor.innerText = array[team].showGoalsFor;
    tr.appendChild(tdGoalsFor);
    // GOALS AGAINST
    const tdGoalsAgainst = document.createElement("td");
    tdGoalsAgainst.className = "goals-against";
    tdGoalsAgainst.innerText = array[team].showGoalsAgainst;
    tr.appendChild(tdGoalsAgainst);
    // POINTS
    const tdPoints = document.createElement("td");
    tdPoints.className = "points";
    tdPoints.innerText = array[team].showPoints;
    tr.appendChild(tdPoints);
  }
}

// fill scoreboard
function fillBoard(array) {
  for (let i = 0; i < array.length; i += 2) {
    const localTeam = array[i];
    const visitorTeam = array[i + 1];
    const match = new Match(localTeam, visitorTeam);
    fillScore(match);
  }
}

// fill match score
function fillScore(game) {
  // create structure
  const score = document.createElement("div");
  score.className = "score";
  scoreboard.appendChild(score);
  // LOCAL
  const localDiv = document.createElement("div");
  localDiv.className = "local";
  score.appendChild(localDiv);
  const localInfo = document.createElement("div");
  localInfo.className = "local-info";
  localInfo.innerText = game.showLocal.name;
  localDiv.appendChild(localInfo);
  const localLogo = document.createElement("img");
  localLogo.src = game.showLocal.logo;
  localInfo.appendChild(localLogo);
  const localGoals = document.createElement("div");
  localGoals.className = "local-goals";
  localGoals.innerText = game.addLocalGoals;
  localDiv.appendChild(localGoals);
  // VISITOR
  const visitorDiv = document.createElement("div");
  visitorDiv.className = "visitor";
  score.appendChild(visitorDiv);
  const visitorInfo = document.createElement("div");
  visitorInfo.className = "visitor-info";
  visitorInfo.innerText = game.showVisitor.name;
  visitorDiv.appendChild(visitorInfo);
  const visitorLogo = document.createElement("img");
  visitorLogo.src = game.showVisitor.logo;
  visitorInfo.appendChild(visitorLogo);
  const visitorGoals = document.createElement("div");
  visitorGoals.className = "visitor-goals";
  visitorGoals.innerText = game.addVisitorGoals;
  visitorDiv.appendChild(visitorGoals);
  // check winner
  game.checkWinner();
}

// reset classification
function resetTable(array) {
  const tds = document.querySelectorAll("td");
  tds.forEach(td => td.remove());
  fillTable(array);
}

// generate goals per match
function goalGen() {
  let rndomGoal;
  let statsCheck;
  let supportParam;

  do {
    supportParam = Math.floor(Math.random() * 10);
    statsCheck = Math.floor(Math.random() * 1000) + 1;

    if (
      supportParam >= 0 &&
      supportParam <= 3 &&
      supportParam !== 300 &&
      supportParam !== 600 &&
      statsCheck <= 900
    ) {
      rndomGoal = supportParam;
    } else if (
      supportParam > 3 &&
      supportParam <= 10 &&
      statsCheck > 990 &&
      statsCheck <= 999
    ) {
      rndomGoal = supportParam;
    } else if (supportParam > 10 && supportParam <= 20 && statsCheck > 999) {
      rndomGoal = supportParam;
    }
  } while (typeof rndomGoal !== typeof supportParam);

  return rndomGoal;
}

// initial conditions
function getStarted() {
  fillBoard(randomList);
  let tableList = _.orderBy(randomList, ["goalsFor"], ["desc"]);
  tableList = _.orderBy(tableList, ["points", "wins"], ["desc"]);
  resetTable(tableList);
}

// button to create initial conditions
const button = document.querySelector(".start");
button.addEventListener("click", () => {
  getStarted();
  button.remove();
});

window.addEventListener("DOMContentLoaded", () => {
  fillTable(TEAMS);
});
