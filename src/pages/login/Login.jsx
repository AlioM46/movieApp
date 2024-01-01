import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ErrorElement from "../../components/ErrorElement/ErrorElement";
import Spinner from "../../components/spinner/Spinner";
import SuccessElement from "../../components/successElement/SuccessElement";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authApiSlice";
import {Form} from "../index";
import "./login.css";
const Login = () => {
  const [
    register,
    {
      isLoading: isLoadingReg,
      isError: isErrorReg,
      isSuccess: isSuccessReg,
      error: errorReg,
    },
  ] = useRegisterMutation();
  const [
    login,
    {
      isLoading: isLoadingLog,
      isError: isErrorLog,
      isSuccess: isSuccessLog,
      error: errorLog,
    },
  ] = useLoginMutation();

  const navigate = useNavigate();

  let content;

  if (isLoadingLog || isLoadingReg) {
    content = <Spinner />;
  }

  if (isSuccessLog) {
    content = <SuccessElement success={"You have logged in successfully!"} />;
  }

  if (isSuccessReg) {
    content = <SuccessElement success={"You have registered successfully."} />;
  }

  useEffect(() => {
    if (isSuccessLog || isSuccessReg) {
      window.location.pathname = "/";
    }
  }, [navigate, isSuccessLog, isSuccessReg]);

  if (isErrorLog || isErrorReg) {
    content = (
      <ErrorElement
        error={
          errorLog?.data?.message ||
          errorLog?.data ||
          errorLog?.message ||
          errorReg?.data?.message ||
          errorReg?.data ||
          errorReg?.message
        }
      />
    );
  }

  return (
    <div className="login  ">
      {content}
      <Form register={register} login={login} />
    </div>
  );
};

export default Login;
