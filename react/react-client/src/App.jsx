import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0); 
  // count = value
  // setCount = function to update it
  useEffect(()=>{
    console.log("App is loaded!");
  },[]);
  // [] means run only one time 

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
      <h3>Check Your Console!</h3>
    </div>
  );
}

export default App;
