import React, { useState, useEffect } from "react";
import { Await, Catch, Pending, Then } from "../Await";
import ping from "./ping.service";
import PingResult from "./PingResult";
import NetworkError from "./NetworkError";

const Ping = () => {
  const [response, setResponse] = useState<null | Promise<Response>>(null);
  useEffect(() => setResponse(ping()), []);

  if (response === null) {
    return null;
  }

  return (
    <Await promise={response}>
      <Pending>Loading...</Pending>
      <Then>
        {(response) => <PingResult response={response as Response} />}
      </Then>
      <Catch>{NetworkError}</Catch>
    </Await>
  );
};

export default Ping;
