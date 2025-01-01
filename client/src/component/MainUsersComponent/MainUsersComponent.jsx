import UserDataCard from "../UserDataCard/UserDataCard";
import "./MainUsersComponent.css";
import { useSelector } from "react-redux";
import React from 'react';
import LoadingDots from "../LoadingDots/LoadingDots";

export default function MainUsersComponent({
  pathForIconAdd = "IconAdd.svg",
  altNameOfIconAdd = "add element",
  textValueOfButtonChange = 'Change User'
}) {
  const { users, isLoading } = useSelector((state) => state.user);

  return (
    <main className="main-users-container">
      {/* Показываем индикатор загрузки, если isLoading равно true */}
      {isLoading ? (
        <LoadingDots />
      ) : (
        <div className="users-content">
          <div className="header-users">
            <h1>Users</h1>
            <img src={pathForIconAdd} alt={altNameOfIconAdd} />
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
