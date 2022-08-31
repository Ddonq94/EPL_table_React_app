import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import AppLeagueTable from "./AppLeagueTable";

afterEach(() => {
  cleanup();
});

describe("League table rendering", () => {
  it("renders AppLeagueTable component", () => {
    const TestFn = () => {
      return <AppLeagueTable testID="AppLeagueTable" />;
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppLeagueTable");
    expect(content).toBeInTheDocument();
    expect(content).toBeDefined();
    expect(content).toBeEnabled();
    expect(
      screen.getByText(/Click a club to see fixtures/i)
    ).toBeInTheDocument();
  });

  it("renders AppLeagueTable component title", () => {
    const TestFn = () => {
      return <AppLeagueTable testID="AppLeagueTable" />;
    };

    render(<TestFn />);

    expect(
      screen.getByText(/Click a club to see fixtures/i)
    ).toBeInTheDocument();
  });

  it("renders AppViewClub on club click from League table", () => {
    const TestFn = () => {
      return <AppLeagueTable testID="AppLeagueTable" />;
    };

    render(<TestFn />);

    fireEvent.click(screen.getByText("Manchester United"));

    expect(
      screen.getByText("Manchester United FC Fixtures")
    ).toBeInTheDocument();
  });

  it("renders AppLeagueTable to match snapshot", () => {
    const TestFn = () => {
      return <AppLeagueTable testID="AppLeagueTable" />;
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppLeagueTable");
    expect(content).toMatchSnapshot();
  });
});
