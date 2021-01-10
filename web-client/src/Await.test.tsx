import { render, screen } from "@testing-library/react";
import React from "react";
import { Await, Pending, Then, Catch } from "./Await";

let resolve, reject;

beforeEach(() => {
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  render(
    <div data-testid="test-yoke">
      <Await promise={promise}>
        <Pending>Pending</Pending>
        <Then>{(result) => <h1>Resolved {result}</h1>}</Then>
        <Catch>{(result) => <h1>Rejected {result}</h1>}</Catch>
      </Await>
    </div>
  );
});

it("displays the pending state when the promise is pending", () => {
  const testYoke = screen.getByTestId("test-yoke");
  expect(testYoke).toMatchSnapshot();
});

it("displays the resolved state when the has resolved", async () => {
  resolve("Then");
  await screen.findByRole("heading");
  const testYoke = screen.getByTestId("test-yoke");
  expect(testYoke).toMatchSnapshot();
});

it("displays the rejected state when the has been rejected", async () => {
  reject("Reject");
  await screen.findByRole("heading");
  const testYoke = screen.getByTestId("test-yoke");
  expect(testYoke).toMatchSnapshot();
});
