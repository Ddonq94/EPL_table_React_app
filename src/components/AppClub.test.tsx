import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import AppClub from "./AppClub";

afterEach(() => {
  cleanup();
});

describe("Club rendering", () => {
  it("renders AppClub component", () => {
    const clubName = "Liverpool";
    const TestFn = () => {
      return <AppClub testID="AppClub" clubName={clubName} />;
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppClub");
    expect(content).toBeInTheDocument();
    expect(content).toBeDefined();
    expect(content).toBeEnabled();
    expect(screen.getByText(/Liverpool/i)).toBeInTheDocument();
  });

  it("renders AppClub for sample club Liverpool", () => {
    const clubName = "Liverpool";

    const TestFn = () => {
      return <AppClub testID="AppClub" clubName={clubName} />;
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppClub");
    expect(content).toBeInTheDocument();
    expect(content).toBeDefined();
    expect(content).toBeEnabled();
    expect(screen.getByText(/Liverpool/i)).toBeInTheDocument();

    const imgContent = getByTestId("AppClubImg");
    expect(imgContent).toBeInTheDocument();
    expect(imgContent).toBeDefined();
    expect(imgContent).toBeEnabled();
  });

  it("renders AppClub for Liverpool with correct Logo src and alt values", () => {
    const clubName = "Liverpool";
    const clubImage =
      "https://resources.premierleague.com/premierleague/badges/25/t14.png";

    const TestFn = () => {
      return <AppClub testID="AppClub" clubName={clubName} />;
    };

    const { getByTestId } = render(<TestFn />);
    const imgContent = getByTestId("AppClubImg");
    expect(imgContent).toHaveAttribute("src", clubImage);
    expect(imgContent).toHaveAttribute("alt", "LiverpoolLogo");
  });

  it("renders AppClub for Liverpool with justifyEnd as false", () => {
    const TestFn = () => {
      return (
        <AppClub testID="AppClub" clubName="Liverpool" justifyEnd={false} />
      );
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppClub");
    expect(content).not.toHaveClass("justify-end");
  });

  it("renders AppClub for Liverpool with justifyEnd as true", () => {
    const TestFn = () => {
      return (
        <AppClub testID="AppClub" clubName="Liverpool" justifyEnd={true} />
      );
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppClub");
    expect(content).toHaveClass("justify-end");
  });

  it("renders AppClub to match snapshot", () => {
    const TestFn = () => {
      return <AppClub testID="AppClub" clubName="Liverpool" />;
    };

    const { getByTestId } = render(<TestFn />);
    const content = getByTestId("AppClub");
    expect(content).toMatchSnapshot();
  });
});
