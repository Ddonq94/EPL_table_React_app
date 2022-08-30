import { getTeamData } from "../services/dataService";

function AppClub({ testID = "AppClub", clubName, justifyEnd = false }: any) {
  return (
    <div
      data-testid={testID}
      className={`club-wrapper ${justifyEnd ? "justify-end" : ""} `}
    >
      <img src={getTeamData(clubName).logo} alt={`${clubName}logo`} />
      <span> {clubName}</span>
    </div>
  );
}

export default AppClub;
