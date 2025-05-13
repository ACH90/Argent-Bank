import { logout as logoutAuth } from "../features/auth/authSlice";
import { logout as logoutUser } from "../features/user/userSlice";

export const logout = () => (dispatch) => {
  dispatch(logoutAuth()); // Logout pour auth
  dispatch(logoutUser()); // Logout pour user
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
};
