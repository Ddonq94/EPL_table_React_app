import React from "react";
import { cleanup, render } from "@testing-library/react";
import AppClub from "./AppClub";

afterEach(() => {
  cleanup();
});

test("renders component", () => {
  const TestFn = () => {
    return <AppClub testID="AppClub" />;
  };

  const { getByTestId } = render(<TestFn />);
  const content = getByTestId("AppClub");
  expect(content).toBeDefined();
  expect(content).toBeInTheDocument();
  expect(content).toBeDefined();
  expect(content).toBeEnabled();
  expect(content).not.toBeEmptyDOMElement();
});
