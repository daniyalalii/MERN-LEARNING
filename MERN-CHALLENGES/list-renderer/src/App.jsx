import { useState, useEffect } from "react";

function App() {
  const [fruits, setfruits] = useState(["Apple", "Banana", "Mango"]);

  useEffect(() => {
    console.log("Fruits state has been updated:", fruits);
  }, [fruits]);

  return (
    <div>
      <h2>List Renderer</h2>
      <button
        onClick={() => setfruits([...fruits, "Orange"])}>
        Add Orange
      </button>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
