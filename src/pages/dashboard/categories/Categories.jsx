import React from "react";
import {FaDeleteLeft} from "react-icons/fa6";
import Table from "../../../components/Table/Table";
import Thead from "../../../components/Thead/Thead";
import genresList from "../../../config/GENRE_IDS.json";
import "./categories.css";
const Categories = () => {
  const {genres} = genresList;

  let content = genres
    ? genres?.map((item) => {
        return (
          <tr>
            <td># {item.id}</td>
            <td>{item.name}</td>
            <td className="actions">
              <button className="dashboard__delete">
                <FaDeleteLeft />
              </button>
            </td>
          </tr>
        );
      })
    : "";

  return (
    <div>
      <Table>
        <Thead>
          <th>ID</th>
          <th>TITLE</th>
          <th>ACTIONS</th>
        </Thead>
        <tbody>{content}</tbody>
      </Table>
    </div>
  );
};

export default Categories;
