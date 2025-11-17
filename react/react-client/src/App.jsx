import UserCard from "./UserCard";

function App(){
  return(
    <div style = {{
      display:"flex", 
      alignItems: "center", 
      justifyContent: "center", 
      flexDirection: "column",
      minHeight: "100vh",
      width: "100%"
    }}>
      <h1>My Users 👋</h1>
      <UserCard name = "Daniyal" age = {19}/>
      <UserCard name = "Hassan" age = {22}/>
    </div>
  );
}

export default App;