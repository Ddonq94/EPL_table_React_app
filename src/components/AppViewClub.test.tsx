import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import AppViewClub from "./AppViewClub";

afterEach(() => {
  cleanup();
});

describe("League table rendering", () => {
  it("renders AppViewClub component", () => {
    let visible = true;
    const handleClose = () => {
      visible = false;
    };
    const TestFn = () => {
      return (
        <AppViewClub
          testID="AppViewClub"
          visible={visible}
          currentTeam={"Liverpool"}
          handleClose={() => handleClose()}
        />
      );
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppViewClub");
    expect(content).toBeInTheDocument();
    expect(content).toBeDefined();
    expect(content).toBeEnabled();
  });

  it("renders AppViewClub component title", () => {
    let visible = true;
    const handleClose = () => {
      visible = false;
    };
    const TestFn = () => {
      return (
        <AppViewClub
          testID="AppViewClub"
          visible={visible}
          currentTeam={"Arsenal"}
          handleClose={() => handleClose()}
        />
      );
    };

    render(<TestFn />);
    expect(screen.getByText(/Arsenal FC Fixtures/i)).toBeInTheDocument();
  });

  it("renders AppViewClub to match snapshot", () => {
    let visible = true;
    const handleClose = () => {
      visible = false;
    };
    const TestFn = () => {
      return (
        <AppViewClub
          visible={visible}
          currentTeam={"Arsenal"}
          handleClose={() => handleClose()}
        />
      );
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppViewClub");
    expect(content).toMatchSnapshot();
  });
});
