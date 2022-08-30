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
      handleClose();
    }
    let fixtures = getTeamFixtures(currentTeam);
    console.log(fixtures);
    setTeamFixtures(fixtures);
  }, [currentTeam]);

  return (
    <Drawer
      title={`${currentTeam} FC Fixtures`}
      placement="right"
      onClose={handleClose}
      visible={visible}
      data-testid={testID}
      width={1000}
    >
      {teamFixtures.map((fixture: any) => {
        let itemKey = JSON.stringify(fixture)
          .replace(/"|{|}|:|,|-/g, "")
          .replaceAll(" ", "");
        return <AppFixture fixture={fixture} key={itemKey} />;
      })}
    </Drawer>
  );
}

export default AppViewClub;
