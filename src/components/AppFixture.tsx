import { useEffect, useState } from "react";
import { format } from "date-fns";

function AppFixture({ testID = "AppFixture", fixture }: any) {
  console.log(fixture);
  const [teamA, setTeamA] = useState<any>();
  const [teamB, setTeamB] = useState<any>();

  useEffect(() => {
    if (fixture) {
      let [homeTeam, awayTeam] = Object.entries(fixture.score);
      setTeamA([...homeTeam]);
      setTeamB([...awayTeam]);
    }
  }, [fixture]);

  return (
    <div data-testid={testID} className="fixture-wrapper">
      {teamA && teamB && (
        <>
          <h3>{format(fixture.dateObj, "dd/MM HH:MM")}</h3>
          {fixture.isFutureFixture ? (
            <div className="fixture-flex-out">
              <span>{teamA[0]}</span>
              <span>{format(fixture.dateObj, "HH:MM")}</span>
              <span>{teamB[0]}</span>
            </div>
          ) : (
            <div className="fixture-flex-out">
              <span>{teamA[0]}</span>
              <span>
                {teamA[1]} - {teamB[1]}
              </span>
              <span>{teamB[0]}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AppFixture;
