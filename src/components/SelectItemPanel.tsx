import { useMemo, useState } from "react";
import { useSelectElementWidgetStore } from "../store/SelectElementWidgetStore";
import type { ElementItem } from "../store/SelectElementWidgetStore";

import { List } from "react-window";
import RowComponent from "./RowComponent";

const SelectItemPanel = ({ elements }: { elements: ElementItem[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("none");

  const { selectedElements, setSelectedElements, setIsPanelOpen } =
    useSelectElementWidgetStore();

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

  const isItemSelected = (id: number) =>
    tempSelectedElements.some((el) => el.id === id);

  const toggleItem = (element: ElementItem) => {
    console.log("adding", element);
    const isSelected = isItemSelected(element.id);

    if (isSelected) {
      setTempSelectedElements(
        tempSelectedElements.filter((el) => el.id !== element.id),
      );
    } else {
      if (tempSelectedElements.length >= 3) return;
      setTempSelectedElements([...tempSelectedElements, element]);
    }
  };

  const filtered = useMemo(() => {
    return elements
      .filter((el) => el.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((el) => {
        if (filterValue === "100") return el.id > 100;
        if (filterValue === "2500") return el.id > 2500;
        if (filterValue === "10000") return el.id > 10000;
        return true;
      });
  }, [elements, searchTerm, filterValue]);

  return (
    <div
      style={{
        border: "1px solid black",
        height: "500px",
        padding: "8px",
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
      <div style={{ height: "300px" }}>
        <List
          rowComponent={RowComponent}
          rowCount={filtered.length}
          rowHeight={25}
          rowProps={{
            elements: filtered,
            isItemSelected,
            toggleItem,
            tempSelectedElements,
          }}
        />
      </div>

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
