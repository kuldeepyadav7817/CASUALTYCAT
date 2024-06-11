import axios from "axios";

// const username = 'noncyber';
// const password = 'rlknIzC90Ug1H^9MT^X!6NZ7mDi7XN*#kDQk31luf6t7FCrWTE';

export default axios.create({
  baseURL: "http://localhost:4442/"
  // baseURL: "https://casualtycat.transasiatec.com/web/client/",
  // auth: {
  //   username: username,
  //   password: password
  // }
});