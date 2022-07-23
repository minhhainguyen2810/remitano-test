import userEvent from "@testing-library/user-event";
import sinon from "sinon";
import Component from ".";
import api from "../../api/apiClient";
import { renderWithProvider, screen, waitFor } from "../../test";
import "../../test/jest.setup";
import * as slice from "./slice";

const stubApiGet = sinon
  .stub(api, "get")
  .callsFake(() => ({ data: [] } as any));
const stubApiPost = sinon
  .stub(api, "post")
  .callsFake(() => ({ data: {} } as any));
describe("Render component", () => {
  it("should render without crash", () => {
    const { container } = renderWithProvider(<Component />);

    expect(container).toBeTruthy();
  });
});

describe("actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("should call authenticate", () => {
    const spyAuthenticate = jest.spyOn(slice, "authenticate");
    renderWithProvider(<Component />);

    expect(spyAuthenticate).toBeCalledTimes(1);
  });
  it("should call getSharedVideos", () => {
    const spyGetSharedVideos = jest.spyOn(slice, "getSharedVideos");
    renderWithProvider(<Component />);

    expect(spyGetSharedVideos).toBeCalledTimes(1);
  });
  it("should open login form", async () => {
    const user = userEvent.setup();
    renderWithProvider(<Component />);
    await user.click(screen.getByText(/Login/));
    await waitFor(() => screen.queryByTestId("login"));

    await waitFor(() => {
      expect(screen.getByTestId("login")).toBeInTheDocument();
    });
  });
  it("should open signup form", async () => {
    const user = userEvent.setup();
    renderWithProvider(<Component />);
    await user.click(screen.getByText(/Sign up/));
    await waitFor(() => screen.getByTestId("signup"));

    await waitFor(() => {
      expect(screen.getByTestId("signup")).toBeInTheDocument();
    });
  });
  it("should show sharedVideos", async () => {
    const user = userEvent.setup();
    stubApiGet.callsFake(
      () =>
        ({
          data: [{ url: "www.test.com", sharedBy: "testUser" }],
        } as any)
    );

    renderWithProvider(<Component />);
    await user.click(screen.getByText(/Sign up/));
    await waitFor(() => screen.getByTestId("signup"));

    expect(screen.getByTestId("signup")).toBeInTheDocument();
    expect(screen.getByText(/Shared by: testUser/)).toBeInTheDocument();
  });
});

describe("integration test", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("should logged in successfully", async () => {
    stubApiPost.callsFake(() => ({ data: {} } as any));
    const user = userEvent.setup();
    renderWithProvider(<Component />);
    await user.click(screen.getAllByText(/Login/)[0]);
    await waitFor(() => screen.getByTestId("login"));
    await user.type(screen.getByTestId("login"), "test");
    await user.type(screen.getByTestId("login-pwd"), "pwd");
    stubApiPost.callsFake(() => ({ data: { username: "testUser" } } as any));
    await user.click(screen.getAllByText(/Submit/)[0]);
    await waitFor(() => screen.getByText(/Welcome, testUser/));
    screen.logTestingPlaygroundURL();

    await waitFor(() => screen.getByText(/Welcome, testUser/));
    expect(screen.getByText(/Welcome, testUser/)).toBeInTheDocument();
  });
  it("should signup successfully", async () => {
    stubApiPost.callsFake(() => ({ data: {} } as any));
    const user = userEvent.setup();
    renderWithProvider(<Component />);
    stubApiPost.callsFake(() => ({ data: "" } as any));
    await user.click(screen.getAllByText(/Sign up/)[0]);
    await user.type(screen.getByTestId("signup"), "test");
    await user.type(screen.getByTestId("signup-pwd"), "pwd");
    stubApiPost.callsFake(() => ({ data: { username: "testUser" } } as any));
    await user.click(screen.getAllByText(/Submit/)[0]);

    expect(screen.getByText(/Welcome, testUser/)).toBeInTheDocument();
  });
  it("should share video successfully", async () => {
    const spyGet = jest.spyOn(slice, "getSharedVideos");
    stubApiPost.callsFake(() => ({ data: { username: "testUser" } } as any));
    stubApiGet.callsFake(
      () =>
        ({
          data: [{ url: "www.test.com", sharedBy: "testUserA" }],
        } as any)
    );
    const user = userEvent.setup();
    renderWithProvider(<Component />);
    await waitFor(() => screen.getAllByText(/Share a movie/)[0]);
    await user.click(screen.getAllByText(/Share a movie/)[0]);
    await user.type(
      screen.getByText(/Url/),
      "https://www.youtube.com/watch?v=4KVIFNJ7mDQ"
    );

    await user.click(screen.getAllByText(/Share/)[0]);
    expect(spyGet).toBeCalled();
  });
});
