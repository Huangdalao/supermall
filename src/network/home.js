import { request } from "./request";

export  function getHomeMulitdata() {
  return request({
    url: "home/multidata"
  });
}
