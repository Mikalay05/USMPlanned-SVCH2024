import UserDataCard from "../UserDataCard/UserDataCard";
import "./MainUsersComponent.css";
import { useSelector } from "react-redux";
import React from 'react';


export default function MainUsersComponent({
  pathForIconAdd = "IconAdd.svg",
  altNameOfIconAdd = "add element",
  textValueOfButtonChange = 'Change User'
}) {

  const {users, isLoadingUsers} = useSelector((state)=>state.user)
  console.log(users)

  return (
    <main>
      <div>
        <h1>Users</h1>
        <img src={pathForIconAdd} alt={altNameOfIconAdd} />
        <div>
        {users.length > 0 ? (
            users.map((user) => (
              <UserDataCard key={user.id} userData={user} textValueOfButtonChange={textValueOfButtonChange} />
            ))
          ) : (
            <p>No users found</p>
          )}        
          </div>
      </div>
    </main>
  );
}
