import {
  baseDateObj,
  data,
  getDateObjFromString,
  getTableFromJSON,
  getTeamData,
  getTeamFixtures,
  isAfterBase,
  leagueTable,
} from "./dataService";

describe("services tests", () => {
  test("should have data array of length 21", () => {
    expect(data).toHaveLength(21);
  });

  test("getDateObjFromString gets date object from string", () => {
    const dateObj = new Date(Date.parse("2021-05-09T14:00:00"));
    expect(dateObj).toEqual(getDateObjFromString("2021-05-09T14:00:00"));
  });

  test("getTeamData gets object with logo from club string", () => {
    const obj = {
      logo: "https://resources.premierleague.com/premierleague/badges/25/t14.png",
    };
    expect(obj).toEqual(getTeamData("Liverpool"));
  });

  test("isAfterBase checks if given date is after the base date", () => {
    const dateObj = new Date(Date.parse("2021-05-09T14:00:00"));

    expect(isAfterBase(dateObj)).toBeTruthy();
  });

  test("if base date is valid", () => {
    const dateObj = new Date(Date.parse("2021-05-05T14:00:00"));

    expect(baseDateObj).toEqual(dateObj);
  });

  test("that leagueTable starts out empty", () => {
    expect(leagueTable).toEqual([]);
  });

  test("that leagueTable has 7 entries given same data", () => {
    getTableFromJSON();
    expect(leagueTable).toHaveLength(7);
  });

  test("that getTeamFixtures has 6 entries given same data", () => {
    expect(getTeamFixtures("Arsenal")).toHaveLength(6);
  });
});
