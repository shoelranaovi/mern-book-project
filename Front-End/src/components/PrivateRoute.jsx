import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const User = useSelector((state) => state.user);
  const { currentUser } = User;
  const navigate = useNavigate();
  if (currentUser == null) {
    return navigate("/login");
  }

  return children;
}

export default PrivateRoute;
