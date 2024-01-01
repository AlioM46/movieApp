import {jwtDecode} from "jwt-decode";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserById} from "../features/users/usersSlice";

const useAuth = () => {
  const [id, setId] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => selectUserById(state, id));

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userInfo?.id;
      setId(userId);
    }
  }, [token]);

  let tokenObj;
  if (token) {
    const isAdmin = user?.roles.includes("admin");
    const isUser = user?.roles.includes("user");

    tokenObj = {
      username: user?.username,
      email: user?.email,
      profileImage: user?.profileImage,
      roles: user?.roles,
      id: user?.id,
      favoritesMovies: user?.favoritesMovies,
      isAdmin,
      isUser,
    };
    return tokenObj;
  } else {
    return {};
  }
};

export default useAuth;
