import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import DropImage from "../../../components/DropImage/DropImage";
import ErrorElement from "../../../components/ErrorElement/ErrorElement";
import Input from "../../../components/Input/Input";
import SuccessElement from "../../../components/successElement/SuccessElement";
import {useUpdateUserMutation} from "../../../features/users/usersApiSlice";
import {selectUserById} from "../../../features/users/usersSlice";
import useAuth from "../../../hooks/useAuth";
import "./updateProfile.css";
const PWDREGEX = /^.{6,}$/; // Change the regex to a RegExp object

const UpdateProfile = () => {
  const {id} = useAuth();
  const user = useSelector((state) => selectUserById(state, id));

  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [username, setUsername] = useState(user?.username || "");
  const [validPwd, setVaildPwd] = useState(PWDREGEX.test(password));
  const [url, setUrl] = useState(false);
  const [updateProfile, {isLoading, data, isError, isSuccess, error}] =
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setProfileImage(user.profileImage);
      setUsername(user.username);
    }
  }, [user]);

  //
  useEffect(() => {
    setVaildPwd(PWDREGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      window.location.pathname = "/dashboard";
    }
  }, [isSuccess]);

  const handleUpdateProfile = async () => {
    try {
      if (password.length > 0) {
        await updateProfile({
          username,
          password,
          profileImage,
          email,
          id: user.id,
        }).unwrap();
      } else {
        await updateProfile({
          username,
          profileImage,
          email,
          id: user.id,
        }).unwrap();
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  let content;
  if (!user) {
    content = (
      <div className="updateProfile__error">
        <h1>😥</h1>
        <Link to={"/login"}>Ooops..</Link>
      </div>
    );
  }
  if (isSuccess) {
    content = <SuccessElement success={data?.message} />;
  }
  if (isError) {
    content = <ErrorElement error={error?.data?.message} />;
  }

  let canSave;
  if (password?.length > 0) {
    canSave =
      [email, password, username, validPwd].every(Boolean) && !isLoading;
  } else {
    canSave = [email, username].every(Boolean) && !isLoading;
  }

  return (
    <div className="updateProfile">
      {content}
      <form>
        <Input
          id={"email"}
          label={"Change Email"}
          placeholder={""}
          setter={setEmail}
          value={email}
          type={"email"}
        />
        <Input
          id={"username"}
          label={"Change Full Name"}
          placeholder={""}
          setter={setUsername}
          value={username}
        />

        <button type="button" onClick={() => setUrl(!url)}>
          {url ? "Select From My Device" : "Image Url"}
        </button>
        {url ? (
          <Input
            id={"Profile Image"}
            label={"Change Profile Picture"}
            placeholder={"Don't Touch It If You don't Want to Change It."}
            setter={setProfileImage}
            value={profileImage}
            maxLength={30}
          />
        ) : (
          ""
          // <DropImage
          //   title={"Set Profile Picture"}
          //   value={profileImage}
          //   setter={setProfileImage}
          // />
        )}

        <Input
          id={"password"}
          label={"Must Have more 6 Characters"}
          placeholder={"Don't Touch It If You don't Want to Change Password!"}
          setter={setPassword}
          value={password}
          type={"password"}
        />
      </form>
      <button onClick={handleUpdateProfile} disabled={!canSave}>
        SAVE
      </button>
    </div>
  );
};

export default UpdateProfile;
