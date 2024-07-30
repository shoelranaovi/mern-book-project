import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthenticationRote({ children }) {
  const User = useSelector((state) => state.user);
  const { currentUser } = User;
  const navigate = useNavigate();
  if (currentUser == null) {
    return navigate("/login");
  }
  if (currentUser.role !== "Admin") {
    return navigate("/home");
  }

  return children;
}

export default AuthenticationRote;
