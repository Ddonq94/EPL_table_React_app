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

  const formattedDate = format(fixture.dateObj, "dd/MM HH:MM");
  const formattedDateShort = format(fixture.dateObj, "HH:MM");
  const score = teamA && teamB ? `${teamA[1]} - ${teamB[1]}` : "";

  const title = fixture.isFutureFixture ? (
    <Badge data-testid={`${testID}Badge`} count={"Future"} offset={[30, 10]}>
      <h3 data-testid={`${testID}Heading`}>{formattedDate}</h3>
    </Badge>
  ) : (
    <h3 data-testid={`${testID}Heading`}>{formattedDate}</h3>
  );

  const center = (
    <span className="fixture-center">
      {fixture.isFutureFixture ? formattedDateShort : score}
    </span>
  );

  return (
    <div data-testid={testID} className="fixture-wrapper">
      {teamA && teamB && (
        <>
          {title}
          <Row className="fixture-Row" gutter={16}>
            <Col span={12}>
              <AppClub clubName={teamA[0]} justifyEnd />
            </Col>
            <Col span={2}>{center}</Col>
            <Col span={10}>
              <AppClub clubName={teamB[0]} />
            </Col>
            <Col></Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default AppFixture;
