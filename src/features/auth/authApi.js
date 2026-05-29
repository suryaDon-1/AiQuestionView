import api from "../../utils/api.js";

// register
const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
// login
const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
//logout
const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
//me
const profile = async ()=>{
    const response = await api.get("/auth/me");
  return response.data;
}
const authservices = {
    register,
    login,
    logout,
    profile
}
export default authservices;