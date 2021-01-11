import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { rest, server } from "../mocks/server";
import Resource from "../api/resource";
import { MemoryRouter } from "react-router-dom";

it("renders a loading screen", async () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: "/ping" }]}>
      <App />
    </MemoryRouter>
  );
  const loadingMessage = await screen.findByText("Loading...");
  expect(loadingMessage).toBeInTheDocument();
});

it("renders a success message when the API responds as expected", async () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: "/ping" }]}>
      <App />
    </MemoryRouter>
  );
  const successMessage = await screen.findByText(
    "The ping endpoint is responding as expected."
  );
  expect(successMessage).toBeInTheDocument();
});

it("renders an error message when the API responds unexpectedly", async () => {
  server.use(
    rest.get(Resource.PING, (req, res, ctx) => res(ctx.json({ data: "poing" })))
  );
  render(
    <MemoryRouter initialEntries={[{ pathname: "/ping" }]}>
      <App />
    </MemoryRouter>
  );
  const unexpectedResultMessage = await screen.findByText(
    "The ping endpoint responded with an unexpected result."
  );
  expect(unexpectedResultMessage).toBeInTheDocument();
});

it("renders an error message when the API responds with an error", async () => {
  server.use(rest.get(Resource.PING, (req, res, ctx) => res(ctx.status(422))));
  render(
    <MemoryRouter initialEntries={[{ pathname: "/ping" }]}>
      <App />
    </MemoryRouter>
  );
  const requestFailedMessage = await screen.findByText(
    "The server returned an error."
  );
  expect(requestFailedMessage).toBeInTheDocument();
});

it("renders an error message when the network request fails", async () => {
  server.use(
    rest.get(Resource.PING, (req, res, ctx) => res.networkError("oops"))
  );

  render(
    <MemoryRouter initialEntries={[{ pathname: "/ping" }]}>
      <App />
    </MemoryRouter>
  );

  const requestFailedMessage = await screen.findByText(
    "The request to the server has failed."
  );
  expect(requestFailedMessage).toBeInTheDocument();
});

it("renders an error message when the api responds with invalid JSON", async () => {
  server.use(rest.get(Resource.PING, (req, res, ctx) => res(ctx.text("pong"))));
  render(
    <MemoryRouter initialEntries={[{ pathname: "/ping" }]}>
      <App />
    </MemoryRouter>
  );
  const unexpectedResultMessage = await screen.findByText(
    "The ping endpoint returned invalid JSON."
  );
  expect(unexpectedResultMessage).toBeInTheDocument();
});
