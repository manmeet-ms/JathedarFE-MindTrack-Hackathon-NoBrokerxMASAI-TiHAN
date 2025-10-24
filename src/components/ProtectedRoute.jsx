import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { fetchUser } from "../store/authSlice";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, status, loading } = useSelector((state) => state.auth);
  console.log(user, status, loading);

  useEffect(() => {
    if (!status && !loading) {
      // only fetch if we don't have a user yet
      dispatch(fetchUser());
    }
  }, [status, loading, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // setLoader(false)
  return children;
};

export default ProtectedRoute;

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ authentication = true, children }) => {
//   const navigate = useNavigate();
//   const [loader, setloader] = useState(true);
//   const authStatus = useSelector((state) => state.auth.status);

//   useEffect(() => {
//     if (authentication && authStatus !== authentication) {
//       navigate("/login");
//       console.log("first condition redirecting to /login AuthLayout.jsx");
//     } else if (!authentication && authStatus !== authentication) {
//       navigate("/");
//       console.log("else if: condition redirecting to 'root' AuthLayout.jsx");
//     }

//     setloader(false);
//   }, [authStatus, navigate, authentication]);

//   return loader ? "Loading..." : {...children };
// };

// export default ProtectedRoute;
