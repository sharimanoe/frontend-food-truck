import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }
  // example of un URL: "http://localhost:5005/auth/singup"
  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
  };

  signup = (requestBody) => {
    console.log(`befour callin the API /signup`);
    return this.api.post("/auth/signup", requestBody);
  };

  verify = () => {
    return this.api.get("/auth/verify");
  };
}

const authService = new AuthService();

export default authService;
