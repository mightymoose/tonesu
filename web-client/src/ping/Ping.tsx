import React, { useState } from "react";
import { Await, Catch, Pending, Then } from "../Await";
import ping from "./ping.service";
import PingResult from "./PingResult";
import NetworkError from "./NetworkError";

const Ping = () => {
  const [result] = useState(ping());

  return (
    <Await promise={result}>
      <Pending>Loading...</Pending>
      <Then>
        {(response) => <PingResult response={response as Response} />}
      </Then>
      <Catch>{NetworkError}</Catch>
    </Await>
  );
};

export default Ping;
