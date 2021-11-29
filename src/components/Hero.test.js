import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero component", () => {
  test("render the hero section", () => {
    // info: Arrange
    render(<Hero />);

    // info: act

    // info: assert
    const heroHeading = screen.getByText(
      "Sacred Heart Catholic Church, Knolta"
    );
    expect(heroHeading).toBeInTheDocument();
  });

  test("render hero paragraph", () => {
    render(<Hero />);
    const renderHeroParagraph = screen.getByText("At your Service", {
      exact: false,
    });
    expect(renderHeroParagraph).toBeInTheDocument();
  });
});
