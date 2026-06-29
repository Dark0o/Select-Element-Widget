import { useState } from "react";

interface ElementItem {
  id: number;
  name: string;
}

const elements: ElementItem[] = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `Element ${i + 1}`,
}));

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("none");

  const [selectedElements, setSelectedElements] = useState<ElementItem[]>([]);
  console.log("Selected elements:", selectedElements);

  const toggleItem = (element: ElementItem) => {
    console.log("adding", element);
    const isSelected = selectedElements.some((el) => el.id === element.id);

    if (isSelected) {
      setSelectedElements(
        selectedElements.filter((el) => el.id !== element.id),
      );
    } else {
      if (selectedElements.length >= 3) return;
      setSelectedElements([...selectedElements, element]);
    }
  };

  const filtered = elements
    .filter((el) => el.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((el) => {
      if (filterValue === "100") return el.id > 100;
      if (filterValue === "2500") return el.id > 2500;
      if (filterValue === "10000") return el.id > 10000;
      return true;
    });

  console.log("filtered", filtered);

  console.log(elements);
  return (
    <>
      <h1>Select items</h1>
      <p>You currently have {selectedElements.length} items selected.</p>
      <button onClick={() => setIsOpen(!isOpen)}>Change my choice</button>

      {isOpen && (
        <div
          style={{
            border: "1px solid black",
            height: "500px",
            padding: "8px",
            overflowY: "scroll",
          }}
        >
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
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {filtered.map((element) => (
              <li key={element.id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => toggleItem(element)}
                    checked={selectedElements.some(
                      (el) => el.id === element.id,
                    )}
                    disabled={
                      selectedElements.length >= 3 &&
                      !selectedElements.some((el) => el.id === element.id)
                    }
                  />
                  {element.name}
                </label>
              </li>
            ))}
          </ul>

          <div>
            Current selected items:
            {selectedElements.map((el) => (
              <span key={el.id}>{el.name}</span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
