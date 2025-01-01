import "./MainUsersComponent.css";

export default function MainUsersComponent({
  pathForIconAdd = "IconAdd.svg",
  altNameOfIconAdd = "add element",
}) {
  return (
    <main>
      <div>
        <h1>Users</h1>
        <img src={pathForIconAdd} alt={altNameOfIconAdd} />
        <div>
            
        </div>
      </div>
    </main>
  );
}
