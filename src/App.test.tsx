import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders App title", () => {
  render(<App />);
  const title = screen.getByText(/Welcome to The Premier League/i);
  expect(title).toBeInTheDocument();
});
