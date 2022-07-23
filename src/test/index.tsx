import { ReactElement } from "react";
import {
  render as baseRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../store";

const render = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
  baseRender(ui, { ...options }) as RenderResult;

const renderWithProvider = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  const element = <Provider store={store}>{ui}</Provider>;
  return baseRender(element, { ...options }) as RenderResult;
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render, renderWithProvider };
