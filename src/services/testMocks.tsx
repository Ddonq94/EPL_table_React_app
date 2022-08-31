export const pastFixtureMock = {
  score: { "Manchester United": 2, Chelsea: 2 },
  date: "2021-03-04T17:00:00",
  isFutureFixture: false,
  dateObj: new Date(Date.parse("2021-03-04T17:00:00")),
};
export const futureFixtureMock = {
  score: { Arsenal: null, Chelsea: null },
  date: "2021-05-11T12:00:00",
  isFutureFixture: true,
  dateObj: new Date(Date.parse("2021-05-11T12:00:00")),
};
