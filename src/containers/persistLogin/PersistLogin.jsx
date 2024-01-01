import usePersist from "../../hooks/usePersist";
import React, {useEffect, useRef ,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner/Spinner.jsx";
import {useRefreshMutation} from "../../features/auth/authApiSlice.js";
import {setToken} from "../../features/auth/authSlice.js";
const PersistLogin = () => {

  const [persist] = usePersist()
  const token = useSelector((state) => state.auth.token)
  const effectRan = useRef(false)
const dispatch = useDispatch()
  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
      isUninitialized,
      isLoading,
      isSuccess,
      isError,
      error
  }] = useRefreshMutation()


  useEffect(() => {

      if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

          const verifyRefreshToken = async () => {
              console.log('verifying refresh token')
              try {
          const response =        await refresh()
                  
                  const { accessToken } = response.data
                  dispatch(setToken(accessToken.data.accessToken));
                  setTrueSuccess(true)
              }
              catch (err) {
                  console.error(err)
              }
          }

          if (!token && persist) verifyRefreshToken()
      }

      return () => effectRan.current = true

      // eslint-disable-next-line
  }, [])


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

  return content
}
export default PersistLogin
