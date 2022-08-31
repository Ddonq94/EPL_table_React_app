import React from "react";
import { cleanup, render } from "@testing-library/react";
import AppFixture from "./AppFixture";
import { pastFixtureMock, futureFixtureMock } from "../services/testMocks";

afterEach(() => {
  cleanup();
});

describe("Fixture rendering", () => {
  it("renders AppFixture component", () => {
    const TestFn = () => {
      return <AppFixture testID="AppFixture" fixture={pastFixtureMock} />;
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppFixture");
    expect(content).toBeInTheDocument();
    expect(content).toBeDefined();
    expect(content).toBeEnabled();
  });

  it("renders AppFixture date correctly", () => {
    const TestFn = () => {
      return <AppFixture testID="AppFixture" fixture={pastFixtureMock} />;
    };

    const formattedDateString = "04/03 17:03";

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppFixtureHeading");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent(formattedDateString);
  });

  it("renders AppFixture home and away teams", () => {
    const TestFn = () => {
      return <AppFixture testID="AppFixture" fixture={pastFixtureMock} />;
    };

    const homeTeam = "Manchester United";
    const awayTeam = "Chelsea";

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppFixture");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent(homeTeam);
    expect(content).toHaveTextContent(awayTeam);
  });

  it("renders AppFixture component with future fixture", () => {
    const TestFn = () => {
      return <AppFixture testID="AppFixture" fixture={futureFixtureMock} />;
    };

    const badgeString = "Future";

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppFixtureBadge");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent(badgeString);
  });

  it("renders AppFixture component with past fixture", () => {
    const TestFn = () => {
      return <AppFixture testID="AppFixture" fixture={pastFixtureMock} />;
    };

    const badgeString = "Future";

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppFixture");
    expect(content).toBeInTheDocument();
    expect(content).not.toHaveTextContent(badgeString);
  });

  it("renders AppFixture to match snapshot", () => {
    const TestFn = () => {
      return <AppFixture testID="AppFixture" fixture={pastFixtureMock} />;
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppFixture");
    expect(content).toBeInTheDocument();
    expect(content).toMatchSnapshot();
  });
});
