import axios from "axios";
import data from '../../public/Health-questions.json'
const instance = axios.create({
  baseURL: `${data}`,
  headers: { "Content-Type": "application/json" }
});

// instance.interceptors.request.use(c => {
//   c.url = `${c.url}}`;
//   return c;
// });

export default instance;
