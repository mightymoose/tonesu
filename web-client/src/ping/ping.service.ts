import { get } from "../api/api";
import Resource from "../api/resource";

export default get.bind(null, Resource.PING);
