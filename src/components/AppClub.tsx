import { getTeamData } from "../services/dataService";

function AppClub({ testID = "AppClub", clubName, justifyEnd = false }: any) {
  return (
    <div
      data-testid={testID}
      className={`club-wrapper ${justifyEnd ? "justify-end" : ""} `}
    >
      <img
        data-testid={`${testID}Img`}
        src={getTeamData(clubName)?.logo}
        alt={`${clubName}Logo`}
      />
      <span> {clubName}</span>
    </div>
  );
}

export default AppClub;
