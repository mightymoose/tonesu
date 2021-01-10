import { rest } from "msw";
import Resource from "../api/resource";

const handlers = [
  rest.get(Resource.PING, (req, res, ctx) => res(ctx.json({ data: "pong" }))),
];

export default handlers;
