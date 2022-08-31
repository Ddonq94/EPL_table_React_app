// ==============================variables and constants and methods====================================
const data = [
  {
    score: {
      "Manchester United": 1,
      "Leicester City": 2,
    },
    date: "2021-05-04T14:00:00",
  },
  {
    score: { "Manchester United": null, Liverpool: null },
    date: "2021-05-09T11:00:00",
  },
  {
    score: { "Manchester United": 1, "Tottenham Hotspur": 1 },
    date: "2021-05-05T11:00:00",
  },
  {
    score: { "Manchester United": 2, Chelsea: 2 },
    date: "2021-03-04T17:00:00",
  },
  {
    score: { "Manchester United": 1, "Manchester City": 2 },
    date: "2021-03-05T17:00:00",
  },
  {
    score: { "Manchester United": 6, Arsenal: 2 },
    date: "2021-01-04T17:00:00",
  },
  {
    score: { Liverpool: null, "Tottenham Hotspur": null },
    date: "2021-05-09T17:00:00",
  },
  {
    score: { Liverpool: null, "Leicester City": null },
    date: "2021-05-06T17:00:00",
  },
  {
    score: { "Manchester City": 1, Liverpool: 2 },
    date: "2021-05-01T14:00:00",
  },
  {
    score: { Arsenal: 2, Liverpool: 3 },
    date: "2021-05-02T17:00:00",
  },
  {
    score: { Chelsea: 1, Liverpool: 3 },
    date: "2021-04-29T17:00:00",
  },
  {
    score: { "Manchester City": 0, Chelsea: 0 },
    date: "2021-04-16T17:00:00",
  },
  {
    score: { "Manchester City": 1, "Leicester City": 2 },
    date: "2021-04-17T17:00:00",
  },
  {
    score: { "Manchester City": null, "Tottenham Hotspur": null },
    date: "2021-05-06T12:00:00",
  },
  {
    score: { "Manchester City": null, Arsenal: null },
    date: "2021-05-11T14:00:00",
  },
  {
    score: { Arsenal: null, Chelsea: null },
    date: "2021-05-11T12:00:00",
  },
  {
    score: { Arsenal: 0, "Leicester City": 0 },
    date: "2021-04-28T12:00:00",
  },
  {
    score: { Arsenal: 1, "Tottenham Hotspur": 1 },
    date: "2021-05-04T12:00:00",
  },
  {
    score: { Chelsea: 1, "Tottenham Hotspur": 1 },
    date: "2021-05-04T14:00:00",
  },
  {
    score: { Chelsea: 1, "Leicester City": 4 },
    date: "2021-05-03T14:00:00",
  },
  {
    score: { "Tottenham Hotspur": null, "Leicester City": null },
    date: "2021-05-09T14:00:00",
  },
];

const clubs = {
  "Leicester City": {
    logo: "https://resources.premierleague.com/premierleague/badges/25/t13.png",
  },
  Liverpool: {
    logo: "https://resources.premierleague.com/premierleague/badges/25/t14.png",
  },
  "Manchester United": {
    logo: "https://resources.premierleague.com/premierleague/badges/25/t1.png",
  },
  "Manchester City": {
    logo: "https://resources.premierleague.com/premierleague/badges/25/t43.png",
  },
  "Tottenham Hotspur": {
    logo: "https://resources.premierleague.com/premierleague/badges/25/t6.png",
  },
  Chelsea: {
    logo: "https://resources.premierleague.com/premierleague/badges/25/t8.png",
  },
  Arsenal: {
    logo: "https://resources.premierleague.com/premierleague/badges/25/t3.png",
  },
};

let leagueTable: any[] = [];

const getDateObjFromString = (dateString: string) => {
  return new Date(Date.parse(dateString));
};

const baseDateObj = getDateObjFromString("2021-05-05T14:00:00");

const isAfterBase = (date1: any) => {
  return date1 > baseDateObj;
};

const getCleanedData = () => {
  // add isFutureFixture flag and dateObj (sorted by date) to data array
  return data
    .map((entry) => {
      let dateObj = getDateObjFromString(entry.date);
      let isFutureFixture = isAfterBase(dateObj);

      return { ...entry, isFutureFixture, dateObj };
    })
    .sort((a: any, b: any) => a.dateObj - b.dateObj);
};

const teamExistsInTable = (table: any, teamName: any) => {
  //check if team has an entry in the leagueTable already
  return table.find((team: any) => team.name === teamName);
};

const addTeamEntry = (team: any, rival: any) => {
  // use fixture to add item to leagueTable
  const oldTeamRecord = teamExistsInTable(leagueTable, team[0]);

  if (oldTeamRecord) {
    const { played, won, drawn, lost, gf, ga } = oldTeamRecord;

    let newTeamObject = {
      ...oldTeamRecord,
      played: played + 1,
      won: team[2] === "win" ? won + 1 : won,
      drawn: team[2] === "draw" ? drawn + 1 : drawn,
      lost: team[2] === "loss" ? lost + 1 : lost,
      gf: team[1] ? gf + team[1] : gf,
      ga: rival[1] ? ga + rival[1] : ga,
    };

    newTeamObject.gd = newTeamObject.gf - newTeamObject.ga;
    newTeamObject.points = newTeamObject.won * 3 + newTeamObject.drawn;

    let temp = leagueTable.filter((entry: any) => entry.name !== team[0]);
    temp.push(newTeamObject);
    leagueTable = temp;
  } else {
    let newTeamObject = {
      name: team[0],
      played: 1,
      won: team[2] === "win" ? 1 : 0,
      drawn: team[2] === "draw" ? 1 : 0,
      lost: team[2] === "loss" ? 1 : 0,
      gf: team[1] || 0,
      ga: rival[1] || 0,
      gd: 0,
      points: 0,
    };

    // @ts-ignore
    newTeamObject.gd = newTeamObject.gf - newTeamObject.ga;
    newTeamObject.points = newTeamObject.won * 3 + newTeamObject.drawn;
    leagueTable.push(newTeamObject);
  }
};

// exports
export const getTableFromJSON = () => {
  // use the cleaned data to generate the leagueTable Array
  leagueTable = [];

  const tableData = getCleanedData();

  for (let entry of tableData) {
    if (entry.isFutureFixture) {
      continue;
    }
    const { score } = entry;
    const entries = Object.entries(score);

    const teamA = [...entries[0]];
    const teamB = [...entries[1]];

    if (teamA[1] === teamB[1]) {
      teamA.push("draw");
      teamB.push("draw");
      // @ts-ignore
    } else if (teamA[1] > teamB[1]) {
      teamA.push("win");
      teamB.push("loss");
    } else {
      teamA.push("loss");
      teamB.push("win");
    }

    addTeamEntry(teamA, teamB);
    addTeamEntry(teamB, teamA);
  }

  // sort by points first then by goal difference
  return leagueTable.sort((a, b) => b.points - a.points || b.gd - a.gd);
};

export const getTeamFixtures = (teamName: any) => {
  // get all fixtures for the given team
  return getCleanedData().filter((entry) => {
    return Object.keys(entry.score).includes(teamName);
  });
};

export const getTeamData = (teamName: string) => {
  // @ts-ignore
  return clubs[teamName];
};
