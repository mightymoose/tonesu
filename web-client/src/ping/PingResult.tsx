import React from "react";
import { ApiResult } from "../api/api";
import { Await, Then, Catch } from "../Await";

interface PingResultProps {
  response: Response;
}

const InvalidJSON = () => <div>The ping endpoint returned invalid JSON.</div>;
const ReceivedError = () => <div>The server returned an error.</div>;
const ReceivedExpectedResponse = () => (
  <div>The ping endpoint is responding as expected.</div>
);
const ReceivedUnexpectedResponse = () => (
  <div>The ping endpoint responded with an unexpected result.</div>
);

const PingResult = ({ response }: PingResultProps) => {
  if (response.ok) {
    return (
      <Await promise={response.json()}>
        <Then>
          {(result) =>
            (result as ApiResult<string>).data === "pong" ? (
              <ReceivedExpectedResponse />
            ) : (
              <ReceivedUnexpectedResponse />
            )
          }
        </Then>
        <Catch>{InvalidJSON}</Catch>
      </Await>
    );
  }

  return <ReceivedError />;
};

export default PingResult;
