import Component from "./App";
import { render, renderWithProvider } from "./test";

describe("Render component", () => {
  it("should render without crash", () => {
    const { container } = renderWithProvider(<Component />);

    expect(container).toBeTruthy();
  });
});
