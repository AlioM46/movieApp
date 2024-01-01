import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useNavigate} from "react-router-dom";
import ErrorElement from "../../components/ErrorElement/ErrorElement.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";
import {useRefreshMutation} from "../../features/auth/authApiSlice.js";
import {setToken} from "../../features/auth/authSlice.js";
import usePersist from "../../hooks/usePersist";
const PersistLogin = () => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const [persist] = usePersist();
  const [refresh, {isLoading, isSuccess, isError, error}] =
    useRefreshMutation();
  const runOneTime = useRef(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (runOneTime.current == true) {
      const verifyRefreshToken = async () => {
        try {
          const accessToken = await refresh();
          dispatch(setToken(accessToken.data.accessToken));
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }
    return () => (runOneTime.current = true);
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = (
      <>
        <ErrorElement error={error?.data?.message} />
        <Outlet />
      </>
    );
  } else if (isSuccess) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
