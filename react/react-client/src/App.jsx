import { useState } from "react";

function App() {
  const [count, setCount] = useState(0); 
  // count = value
  // setCount = function to update it

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default App;
