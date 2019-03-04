import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:3001/api/${process.env.ROUTE_VERSION}/users`
});
