import React from "react";
import { cleanup, render } from "@testing-library/react";
import AppLeagueTable from "./AppLeagueTable";

afterEach(() => {
  cleanup();
});

test("renders component", () => {
  const TestFn = () => {
    return <AppLeagueTable testID="AppLeagueTable" />;
  };

  const { getByTestId } = render(<TestFn />);
  const content = getByTestId("AppLeagueTable");
  expect(content).toBeDefined();
  expect(content).toBeInTheDocument();
  expect(content).toBeDefined();
  expect(content).toBeEnabled();
  expect(content).not.toBeEmptyDOMElement();
});
