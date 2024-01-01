import React, {useEffect, useState} from "react";
import {CiLogin} from "react-icons/ci";
import {useDispatch} from "react-redux";
import logo from "../../../assets/logo.png";
import {setToken} from "../../../features/auth/authSlice";
import usePersist from "../../../hooks/usePersist";
import "./form.css";

const Form = ({register, login}) => {
  const [persist, setPersist] = usePersist();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setPassword("");
    setUsername("");
    setEmail("");
  }, [login]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //
      const {accessToken} = await login({email, password}).unwrap();
      dispatch(setToken(accessToken));
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      //
      const {accessToken} = await register({
        email,
        password,
        username,
      }).unwrap();
      dispatch(setToken(accessToken));
    } catch (error) {
      console.log(error);
    }
  };
  let form;
  if (isLogin) {
    form = (
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type Your Email Please!"
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type Your Password Please!"
            type="password"
            id="password"
            name="password"
          />
        </div>
      </form>
    );
  }

  if (!isLogin) {
    form = (
      <form onSubmit={(e) => handleRegister(e)}>
        <div>
          <label htmlFor="name">FullName</label>
          <input
            placeholder="Type Your FullName Please!"
            type="text"
            id="name"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Type Your Email Please!"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            placeholder="Type Your Password Please!"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </form>
    );
  }

  return (
    <div className="login__form">
      <img src={logo} alt="Logo" title="Logo" />
      {form}
      <button
        onClick={isLogin ? handleLogin : handleRegister}
        className="login__form__cta"
      >
        <CiLogin />
        {isLogin ? "Sign In" : "Sing Up"}
      </button>
      <div className="login__form__toggle">
        <p>
          {login ? "Don't have an account ?" : "Already have an account ? "}
        </p>
        <button onClick={() => setIsLogin(!isLogin)}>
          {!login ? "Sign In" : "Sing Up"}
        </button>

        <div className="login__persist">
          <label htmlFor="trustMe">Trust This Device?</label>
          <input
            id="trustMe"
            type="checkbox"
            onChange={() => setPersist(!persist)}
            checked={persist}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
