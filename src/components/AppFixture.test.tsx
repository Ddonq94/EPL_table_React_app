import React from "react";
import { cleanup, render } from "@testing-library/react";
import AppFixture from "./AppFixture";

afterEach(() => {
  cleanup();
});

test("renders component", () => {
  const TestFn = () => {
    return <AppFixture testID="AppFixture" />;
  };

  const { getByTestId } = render(<TestFn />);
  const content = getByTestId("AppFixture");
  expect(content).toBeDefined();
  expect(content).toBeInTheDocument();
  expect(content).toBeDefined();
  expect(content).toBeEnabled();
  expect(content).not.toBeEmptyDOMElement();
});
