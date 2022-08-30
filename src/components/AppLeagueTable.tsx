import { useEffect, useState } from "react";
import { getTableFromJSON } from "../services/dataService";

function AppLeagueTable({ testID = "AppLeagueTable" }: any) {
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    const newTableData = getTableFromJSON();
    setTableData(getTableFromJSON());
  }, []);

  return (
    <section data-testid={testID} className="AppLeagueTable">
      <h3 className="center-text">Click a club to see fixtures</h3>
    </section>
  );
}

export default AppLeagueTable;
