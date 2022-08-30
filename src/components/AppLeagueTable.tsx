import { Table } from "antd";
import { useEffect, useState } from "react";
import { getTableFromJSON } from "../services/dataService";

function AppLeagueTable({ testID = "AppLeagueTable" }: any) {
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    const newTableData = getTableFromJSON();
    console.log(newTableData);

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
      dataIndex: "name",
      key: "name",
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

      <Table columns={columns} dataSource={tableData} pagination={false} />
    </section>
  );
}

export default AppLeagueTable;
