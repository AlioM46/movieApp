import React, {useState} from "react";
import {
  FaHeart,
  FaListAlt,
  FaLock,
  FaPlusSquare,
  FaUsersCog,
} from "react-icons/fa";
import {FaGear} from "react-icons/fa6";
import {MdCategory, MdDashboard} from "react-icons/md";
import {Link, Outlet, useLocation} from "react-router-dom";
import useAUth from "../../hooks/useAuth";
import "./dashboard.css";

const splitWords = (word) => {
  let words = [];
  let currentWord = "";

  for (let i = 0; i < word.length; i++) {
    if (word[i].toLowerCase() === word[i]) {
      currentWord += word[i];
    } else {
      if (currentWord.length > 0) {
        words.push(currentWord);
        currentWord = "";
      }

      currentWord += word[i];
    }
  }

  if (currentWord.length > 0) {
    words.push(currentWord);
    currentWord = "";
  }

  return words.join(" ");
};

const linksArray = [
  {url: "/", icon: <MdDashboard />},
  {url: "moviesList", admin: true, icon: <FaListAlt />},
  {url: "addMovie", admin: true, icon: <FaPlusSquare />},
  {url: "categories", admin: true, icon: <MdCategory />},
  {url: "usersList", admin: true, icon: <FaUsersCog />},
  {url: "updateProfile", icon: <FaGear />},
  {url: "favoritesMovies", icon: <FaHeart />},
];

const Dashboard = () => {
  const {pathname} = useLocation();
  const {isAdmin} = useAUth();

  return (
    <div className="dashboard">
      <aside>
        <ul>
          {linksArray?.map((link, index) => {
            if (index === 0) {
              return (
                <li
                  className={`${`/dashboard` == pathname && "active"} `}
                  key={index}
                >
                  <Link to={"/dashboard"}>Statistics {link.icon}</Link>
                </li>
              );
            }

            let adminStyle = {
              display: !isAdmin && link.admin ? "none" : "block",
            };

            return (
              <li
                style={adminStyle}
                className={`${
                  `/dashboard/${link.url}` == pathname ? "active" : ""
                }`}
                key={index}
              >
                <Link to={`/dashboard/${link?.url}`}>
                  {splitWords(link.url)}
                  {link.icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <Outlet />
    </div>
  );
};

export default Dashboard;
