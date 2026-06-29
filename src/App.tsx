import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("none");
  return (
    <>
      <h1>Select items</h1>
      <button onClick={() => setIsOpen(!isOpen)}>Change my choice</button>

      {isOpen && (
        <div>
          <h3>Select items</h3>
          <div style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
            <label>
              Search
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </label>
            <label>
              Filter
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="none">No filter</option>
                <option value="100">&gt;100</option>
                <option value="2500">&gt;2500</option>
                <option value="10000">&gt;10000</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
