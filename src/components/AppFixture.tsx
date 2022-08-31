import { useEffect, useState } from "react";
import { format } from "date-fns";
import AppClub from "./AppClub";
import { Badge, Col, Row } from "antd";

function AppFixture({ testID = "AppFixture", fixture }: any) {
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
          {fixture.isFutureFixture ? (
            <>
              <Badge
                data-testid={`${testID}Badge`}
                count={"Future"}
                offset={[30, 10]}
              >
                <h3 data-testid={`${testID}Heading`}>
                  {format(fixture.dateObj, "dd/MM HH:MM")}
                </h3>
              </Badge>
              <Row className="fixture-Row" gutter={16}>
                <Col span={12}>
                  <AppClub clubName={teamA[0]} justifyEnd />
                </Col>
                <Col span={2}>
                  <span className="fixture-center">
                    {format(fixture.dateObj, "HH:MM")}
                  </span>
                </Col>
                <Col span={10}>
                  <AppClub clubName={teamB[0]} />
                </Col>
                <Col></Col>
              </Row>
            </>
          ) : (
            <>
              <h3 data-testid={`${testID}Heading`}>
                {format(fixture.dateObj, "dd/MM HH:MM")}
              </h3>
              <Row className="fixture-Row" gutter={16}>
                <Col span={12}>
                  <AppClub clubName={teamA[0]} justifyEnd />
                </Col>
                <Col span={2}>
                  <span className="fixture-center">
                    {teamA[1]} - {teamB[1]}
                  </span>
                </Col>
                <Col span={10}>
                  <AppClub clubName={teamB[0]} />
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AppFixture;
