import { useEffect } from "react";

function AppViewClub({ testID = "AppViewClub" }: any) {
  return <section data-testid={testID} className="AppView"></section>;
}

export default AppViewClub;
