import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { getTableFromJSON } from "../services/dataService";
import AppViewClub from "./AppViewClub";

function AppLeagueTable({ testID = "AppLeagueTable" }: any) {
  const [tableData, setTableData] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<any>("");

  const handleTeamClick = (teamName: any) => {
    setCurrentTeam(teamName);
    setVisible(true);
  };

  useEffect(() => {
    const newTableData = getTableFromJSON();

    setTableData(newTableData);
  }, []);

  const columns: any = [
    {
      title: "Position",
      key: "index",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Club",
      key: "name",
      dataIndex: "name",
      render: (text: any, record: any) => {
        return (
          <Button type="link" onClick={() => handleTeamClick(record.name)}>
            {record.name}
          </Button>
        );
      },
    },
    {
      title: "Played",
      dataIndex: "played",
      key: "played",
    },
    {
      title: "Won",
      dataIndex: "won",
      key: "won",
    },
    {
      title: "Drawn",
      dataIndex: "drawn",
      key: "drawn",
    },
    {
      title: "Lost",
      dataIndex: "lost",
      key: "lost",
    },
    {
      title: "GF",
      dataIndex: "gf",
      key: "gf",
    },
    {
      title: "GA",
      dataIndex: "ga",
      key: "ga",
    },
    {
      title: "GD",
      dataIndex: "gd",
      key: "gd",
      render: (text: any, { gd }: any) => (gd > 0 ? `+${gd}` : gd),
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
  ];

  return (
    <section data-testid={testID} className="AppLeagueTable">
      <h3 className="center-text">Click a club to see fixtures</h3>

      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowKey="name"
      />

      {visible && (
        <AppViewClub
          visible={visible}
          currentTeam={currentTeam}
          handleClose={() => setVisible(false)}
        />
      )}
    </section>
  );
}

export default AppLeagueTable;
