import api from "./api";

export const AuthService = {

   register(data) {
    return api.post("/auth/register", data);
  },

  login(data) {
    return api.post("/auth/login", data);
  },

  profile() {
    return api.get("/auth/profile");
  },

  logout() {
    return api.post("/auth/logout");
  },
};
