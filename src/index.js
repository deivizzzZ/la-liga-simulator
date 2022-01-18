class Team {
  constructor(name, logo) {
    this.name = name;
    this.logo = logo;
    this.points = 0;
    this.wins = 0;
    this.ties = 0;
    this.loses = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
    this.goalsDiff = 0;
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

  addGoalsDiff() {
    this.goalsDiff = this.goalsFor - this.goalsAgainst;
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
    this.local.addGoalsDiff();
    this.visitor.addGoalsDiff();
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

const weeksArray = [];
let tableList;
let totalWeeks;
let counter = 1;

const table = document.querySelector("table");
const scoreboard = document.querySelector(".scoreboard");
const panel = document.querySelector(".panel");
const button = document.querySelector(".start");
const next = document.querySelector(".next");
const weekInfo = document.querySelector(".week");

// create the complete array of game weeks
function createAllCalendar() {
  for (let i = 0; i < TEAMS.length - 1; i++) {
    weeksArray.push(new Week(generateWeek(i)));
  }
}

// generate matches per week
function generateWeek(i) {
  const weekMatches = [];
  for (const team of TEAMS) {
    const criteria = (el) => el.id === team.matches[i];
    const match = new Match(team, TEAMS.find(criteria));
    weekMatches.push(match);
  }
  return weekMatches;
}

// generate matches calendar
function fixture(ts) {
  const mc = ts.length - 1;
  let sp = 0;
  let tm = 0;
  return ts.map(
    (t, i, a) => (
      a.slice(i + 1).forEach(function(_, j, b) {
        sp = (2 * i + j) % mc;
        tm = ((j + mc - i - 1) % (mc - i)) + i + 1;
        t.matches[sp] = a[tm].id;
        a[tm].matches[sp] = t.id;
      }),
      t
    )
  );
}

// generate id for each team
function generateCalendar(array) {
  const tc = array.length;
  array.forEach((e, i) => {
    e.id = i;
    e.matches = Array(tc - 1);
  });
  fixture(array);
}

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
  for (const match of array.matches) {
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
  tds.forEach((td) => td.remove());
  fillTable(array);
}

// show league winner
function showWinner() {
  const winner = tableList[0];
  console.log(winner);
  const winnerInfo = document.createElement("div");
  winnerInfo.className = "winner-info";
  panel.appendChild(winnerInfo);
  const winnerLogo = document.createElement("img");
  winnerLogo.className = "winner-logo";
  winnerLogo.src = winner.showLogo;
  winnerInfo.appendChild(winnerLogo);
  const winnerDescription = document.createElement("p");
  winnerDescription.className = "winner-description";
  winnerDescription.innerText = `¡¡${winner.showName.toUpperCase()} ha ganado!!`;
  winnerInfo.appendChild(winnerDescription);
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

// update classification
function update() {
  // tableList = _.orderBy(TEAMS, ["goalsFor"], ["asc"]);
  // tableList = _.orderBy(TEAMS, ["goalsDiff"], ["desc"]);
  tableList = _.orderBy(TEAMS, ["points", "wins"], ["desc"]);
  resetTable(tableList);
  resetInfo();
}

// initial conditions
function getStarted() {
  const firstWeek = weeksArray.shift();
  fillBoard(firstWeek);
  update();
}

function resetInfo() {
  weekInfo.innerText = "";
  weekInfo.innerText = `Jornadas ${counter}/${counter + 1}\nde ${totalWeeks * 2}`;
  counter += 2;
}

// button to create initial conditions
button.addEventListener("click", () => {
  getStarted();
  button.remove();
  next.classList.remove("hidden");
  weekInfo.classList.remove("hidden");
});

next.addEventListener("click", () => {
  scoreboard.innerHTML = "";
  const nextWeek = weeksArray.shift();
  if (nextWeek === undefined) {
    next.remove();
    weekInfo.remove();
    showWinner();
  } else {
    fillBoard(nextWeek);
    update();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  fillTable(TEAMS);
  generateCalendar(TEAMS);
  createAllCalendar();
  totalWeeks = weeksArray.length;
});
