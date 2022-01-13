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
  set addGoalsFor(goals) {
    this.goalsFor += goals;
  }
  set addGoalsAgainst(goals) {
    this.goalsAgainst += goals;
  }
  set addPoints(points) {
    this.points += points;
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
  new Team("Villarreal", "./img/villarreal.png")
];

const table = document.querySelector("table");

function fillTable(array) {
  for(let team in array) {
    // ROW
    let tr = document.createElement("tr");
    table.appendChild(tr);
    // POSITION
    let tdNumber = document.createElement("td");
    let position = Number(team) + 1;
    tdNumber.innerText = position;
    tr.appendChild(tdNumber);
    // LOGO
    let tdLogo = document.createElement("td");
    tdLogo.className = "logo";
    tr.appendChild(tdLogo);
    let imgLogo = document.createElement("img");
    imgLogo.src = array[team].showLogo;
    tdLogo.appendChild(imgLogo);
    // NAME
    let tdName = document.createElement("td");
    tdName.className = "name";
    tdName.innerText = array[team].showName;
    tr.appendChild(tdName);
    // WINS
    let tdWins = document.createElement("td");
    tdWins.className = "wins";
    tdWins.innerText = array[team].showWins;
    tr.appendChild(tdWins);
    // TIES
    let tdTies = document.createElement("td");
    tdTies.className = "ties";
    tdTies.innerText = array[team].showTies;
    tr.appendChild(tdTies);
    // LOSES
    let tdLoses = document.createElement("td");
    tdLoses.className = "loses";
    tdLoses.innerText = array[team].showLoses;
    tr.appendChild(tdLoses);
    // GOALS FOR
    let tdGoalsFor = document.createElement("td");
    tdGoalsFor.className = "goals-for";
    tdGoalsFor.innerText = array[team].showGoalsFor;
    tr.appendChild(tdGoalsFor);
    // GOALS AGAINST
    let tdGoalsAgainst = document.createElement("td");
    tdGoalsAgainst.className = "goals-against";
    tdGoalsAgainst.innerText = array[team].showGoalsAgainst;
    tr.appendChild(tdGoalsAgainst);
    // POINTS
    let tdPoints = document.createElement("td");
    tdPoints.className = "points";
    tdPoints.innerText = array[team].showPoints;
    tr.appendChild(tdPoints);
  }
}

function getStarted() {
  fillTable(TEAMS);
}

window.addEventListener("DOMContentLoaded", () => {
  getStarted();
});
