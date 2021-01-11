import React, { useState, useEffect } from "react";
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

const Result = ({ response }: PingResultProps) => {
  const [result, setResult] = useState<null | Promise<ApiResult<string>>>(null);

  useEffect(() => setResult(response.json()), [response]);

  if (result === null) {
    return null;
  }

  return (
    <Await promise={result}>
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
};

const PingResult = ({ response }: PingResultProps) =>
  response.ok ? <Result response={response} /> : <ReceivedError />;

export default PingResult;
