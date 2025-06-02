import axios from "axios";
const token = localStorage.getItem("token");

const response = await axios.get("http://localhost:3000/api/", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const myUrls = response.data;
export default myUrls;