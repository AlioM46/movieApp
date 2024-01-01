import React, {useEffect, useRef ,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner/Spinner.jsx";
import {useRefreshMutation} from "../../features/auth/authApiSlice.js";
import {setToken} from "../../features/auth/authSlice.js";
import usePersist from "../../hooks/usePersist";
const PersistLogin = () => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();    const [trueSuccess, setTrueSuccess] = useState(false)

  const [persist] = usePersist();
  const [refresh, {isLoading, isSuccess, isError, error,        isUninitialized,
  }] =
    useRefreshMutation();
  const runOneTime = useRef(false);

  useEffect(() => {
    if (runOneTime.current == true) {
      const verifyRefreshToken = async () => {
        try {
          const accessToken = await refresh();
          dispatch(setToken(accessToken.data.accessToken));
          console.log("Token Refreshed")
          setTrueSuccess(true)
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }
    return () => (runOneTime.current = true);
  }, []);

  let content
  if (!persist) { // persist: no
      console.log('no persist')
      content = <Outlet />
  } else if (isLoading) { //persist: yes, token: no
      console.log('loading')
      content = <Spinner color={"#FFF"} />
  } else if (isError) { //persist: yes, token: no
      console.log('error')
      content = (
          <p className='errmsg'>
              {`${error?.data?.message} - `}
              <Link to="/login">Please login again</Link>.
          </p>
      )
  } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
      console.log('success')
      content = <Outlet />
  } else if (token && isUninitialized) { //persist: yes, token: yes
      console.log('token and uninit')
      console.log(isUninitialized)
      content = <Outlet />
  }


  return content;
};

export default PersistLogin;
