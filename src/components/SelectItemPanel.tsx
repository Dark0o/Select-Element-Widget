import { useMemo, useState } from "react";
import { useSelectElementWidgetStore } from "../store/SelectElementWidgetStore";
import type { ElementItem } from "../store/SelectElementWidgetStore";

import { List } from "react-window";
import { useListRef } from "react-window";

import RowComponent from "./RowComponent";

const SelectItemPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("none");

  const listRef = useListRef(null);

  const { elements, selectedElements, setSelectedElements, setIsPanelOpen } =
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

  const scrollToItem = (id: number) => {
    const index = filtered.findIndex((el) => el.id === id);

    listRef.current?.scrollToRow({ index });
  };

  return (
    <div
      style={{
        border: "1px solid black",
        height: "600px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
          padding: "16px",
        }}
      >
        <h3>Select items</h3>
        <button onClick={() => setIsPanelOpen(false)}>X</button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          padding: "16px",
          borderBottom: "1px solid black",
        }}
      >
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
      <div style={{ height: "300px", padding: "16px" }}>
        {filtered.length === 0 ? (
          <p>No elements match your search.</p>
        ) : (
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
            listRef={listRef}
          />
        )}
      </div>

      <div style={{ padding: "16px", borderTop: "1px solid black" }}>
        Current selected items:
        {tempSelectedElements.map((el) => (
          <span key={el.id}>
            {el.name} <button onClick={() => scrollToItem(el.id)}>Find</button>
          </span>
        ))}
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SelectItemPanel;
