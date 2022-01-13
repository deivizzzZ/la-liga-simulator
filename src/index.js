class Team {
  constructor(name, logo) {
    this.name = name;
    this.logo = logo;
  }
  get getName() {
    return this.name;
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
