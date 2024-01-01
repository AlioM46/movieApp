import React from "react";
import {FaDeleteLeft} from "react-icons/fa6";
import {useSelector} from "react-redux";
import ErrorElement from "../../../components/ErrorElement/ErrorElement";
import Table from "../../../components/Table/Table";
import Thead from "../../../components/Thead/Thead";
import SuccessElement from "../../../components/successElement/SuccessElement";
import {useDeleteUserMutation} from "../../../features/users/usersApiSlice";
import {selectAllUsers} from "../../../features/users/usersSlice";
import "./usersList.css";
const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const [deleteUser, {isLoading, isError, isSuccess, data, error}] =
    useDeleteUserMutation();

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser({userId});
    } catch (error) {
      console.log(error?.message);
    }
  };

  let element;

  if (isSuccess) {
    element = <SuccessElement success={data?.message} />;
  }
  if (isError) {
    element = <ErrorElement error={error?.data?.message} />;
  }

  let content;

  if (Object.values(users).length > 0) {
    content = Object.values(users)?.map((item) => {
      return (
        <>
          <tr className="usersList__tr">
            <td>
              <img src={item.profileImage} alt={item.username} />
            </td>
            <td>{item.id.slice(0, 8)}....</td>
            <td>{formatDate(item.createdAt) || "None"}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.roles}</td>
            <td className="actions">
              {
                <button
                  onClick={() => handleDeleteUser(item.id)}
                  className="dashboard__delete"
                >
                  <FaDeleteLeft />
                </button>
              }
            </td>
          </tr>
        </>
      );
    });
  }

  return (
    <div>
      {element}
      <Table>
        <Thead>
          <th>IMAGE</th>
          <th>ID</th>
          <th>Member From</th>
          <th>FULL NAME</th>
          <th>EMAIL</th>
          <th>ROLE</th>
          <th>ACTIONS</th>
        </Thead>
        <tbody>{content}</tbody>
      </Table>
    </div>
  );
};

export default UsersList;

const formatDate = (date) => {
  const oldDate = new Date(date);
  const currentDate = new Date();
  const differentDate = Math.floor((currentDate - oldDate) / 1000);

  if (differentDate <= 60) {
    return `${Math.floor(differentDate)} Second${differentDate > 1 && "s"}`;
  } else if (differentDate / 60 <= 60) {
    return `${Math.floor(differentDate / 60)} Minute${
      differentDate > 1 && "s"
    }`;
  } else if (differentDate / 60 / 60 <= 24) {
    return `${Math.floor(differentDate / 60 / 60)} Hour${
      differentDate > 1 && "s"
    } `;
  } else if (differentDate / 60 / 60 / 24 <= 7) {
    return `a Week Ago`;
  } else if (differentDate / 60 / 60 / 24 / 30 <= 30) {
    return `a Month Ago`;
  }
};
