import { useState } from "react";
import { useSelectElementWidgetStore } from "../store/SelectElementWidgetStore";

interface ElementItem {
  id: number;
  name: string;
}

const SelectItemPanel = ({ elements }: { elements: ElementItem[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("none");

  //   const [selectedElements, setSelectedElements] = useState<ElementItem[]>([]);
  const { selectedElements, setSelectedElements } =
    useSelectElementWidgetStore();

  const { setIsPanelOpen } = useSelectElementWidgetStore();

  const [tempSelectedElements, setTempSelectedElements] = useState<
    ElementItem[]
  >([...selectedElements]);

  const handleSave = () => {
    setSelectedElements(tempSelectedElements);
    setIsPanelOpen(false);
  };

  const handleCancel = () => {
    setIsPanelOpen(false);
  };

  console.log("Selected elements:", selectedElements);

  const toggleItem = (element: ElementItem) => {
    console.log("adding", element);
    const isSelected = tempSelectedElements.some((el) => el.id === element.id);

    if (isSelected) {
      setTempSelectedElements(
        tempSelectedElements.filter((el) => el.id !== element.id),
      );
    } else {
      if (tempSelectedElements.length >= 3) return;
      setTempSelectedElements([...tempSelectedElements, element]);
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
  return (
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
                checked={tempSelectedElements.some(
                  (el) => el.id === element.id,
                )}
                disabled={
                  tempSelectedElements.length >= 3 &&
                  !tempSelectedElements.some((el) => el.id === element.id)
                }
              />
              {element.name}
            </label>
          </li>
        ))}
      </ul>

      <div>
        Current selected items:
        {tempSelectedElements.map((el) => (
          <span key={el.id}>{el.name}</span>
        ))}
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default SelectItemPanel;
