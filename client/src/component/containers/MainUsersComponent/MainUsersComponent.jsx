import UserDataCard from "../../UserDataCard/UserDataCard";
import "./MainUsersComponent.css";
import { useSelector } from "react-redux";
import React from 'react';
import LoadingDots from '../../presentational/LoadingDots/LoadingDots';
import { Link } from "react-router-dom"; 

export default function MainUsersComponent({
  pathForIconAdd = "IconAdd.svg",
  altNameOfIconAdd = "add element",
  textValueOfButtonChange = 'Change User',
  pathForAddUser = "/" 
}) {
  const { users, isLoading } = useSelector((state) => state.user);

  return (
    <main className="main-users-container">
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="users-content">
          <div className="header-users">
            <h1>Users</h1>
            <Link to={pathForAddUser}>
              <img src={pathForIconAdd} alt={altNameOfIconAdd} />
            </Link>
          </div>

          <div className="user-list">
            {users.length > 0 ? (
              users.map((user) => (
                <UserDataCard
                  key={user.id}
                  userData={user}
                  textValueOfButtonChange={textValueOfButtonChange}
                />
              ))
            ) : (
              <p className="no-users-message">No users found</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
