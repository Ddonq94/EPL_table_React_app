import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { getTeamFixtures } from "../services/dataService";
import AppFixture from "./AppFixture";

function AppViewClub({
  testID = "AppViewClub",
  handleClose,
  visible,
  currentTeam,
}: any) {
  const [teamFixtures, setTeamFixtures] = useState<any>([]);

  useEffect(() => {
    if (!currentTeam) {
      handleClose && handleClose();
    }
    let fixtures = getTeamFixtures(currentTeam);
    setTeamFixtures(fixtures);
  }, [currentTeam]);

  return (
    <Drawer
      title={`${currentTeam} FC Fixtures`}
      placement="right"
      onClose={handleClose}
      visible={visible}
      width={700}
    >
      <div data-testid={testID}>
        {teamFixtures.map((fixture: any) => {
          const itemKey = JSON.stringify(fixture)
            .replace(/"|{|}|:|,|-/g, "")
            .replace(" ", "");

          return <AppFixture fixture={fixture} key={itemKey} />;
        })}
      </div>
    </Drawer>
  );
}

export default AppViewClub;
