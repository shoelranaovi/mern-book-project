const backEndDomin = "http://localhost:8080";

export const summaryApi = {
  getRecentBook: {
    url: `${backEndDomin}/api/book/getrecentbook`,
    method: "get",
  },
  sigup: {
    url: `${backEndDomin}/api/signup`,
    method: "post",
  },
  signin: {
    url: `${backEndDomin}/api/signin`,
    method: "post",
  },
  signout: {
    url: `${backEndDomin}/api/signout`,
    method: "post",
  },
  userdetails: {
    url: `${backEndDomin}/api/getuserDetail`,
    method: "get",
  },
};
