import { parseJwt } from "./Utils";

class JwtService {
  static getToken() {
    return localStorage.getItem("GroupomaniaP7Axel");
  }
  static getTokenDecrypted() {
    return parseJwt(this.getToken());
  }
  static setToken(token) {
    localStorage.setItem("GroupomaniaP7Axel", token);
  }
}

export default JwtService;
