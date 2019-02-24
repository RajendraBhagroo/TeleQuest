import axios from "axios";

// RTMP Server
export default axios.create({
  baseURL: "http://localhost:3002"
});
