export class Login {
  static isAuthenticated = false;
  static xCsrfToken = "";
  static authDetails = "";
  static userName = "";
  static sessionId = "";

  static getXCsrfToken() {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split("=");
      if (cookie[0].trim() === "x-csrf-token") {
        return cookie[1].trim();
      }
    }
  }

}


