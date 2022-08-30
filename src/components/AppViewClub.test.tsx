import React from "react";
import { cleanup, render } from "@testing-library/react";
import AppViewClub from "./AppViewClub";

afterEach(() => {
  cleanup();
});

test("renders component", () => {
  const TestFn = () => {
    return <AppViewClub testID="AppViewClub" />;
  };

  const { getByTestId } = render(<TestFn />);
  const content = getByTestId("AppViewClub");
  expect(content).toBeDefined();
  expect(content).toBeInTheDocument();
  expect(content).toBeDefined();
  expect(content).toBeEnabled();
  expect(content).not.toBeEmptyDOMElement();
});
