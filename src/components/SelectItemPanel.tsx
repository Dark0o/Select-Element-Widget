import { useMemo, useState } from "react";
import { useSelectElementWidgetStore } from "../store/SelectElementWidgetStore";
import type { ElementItemType } from "../store/SelectElementWidgetStore";
import ElementItem from "./ElementItem";

import { List } from "react-window";

import RowComponent from "./RowComponent";
import styles from "./SelectItemPanel.module.css";

const SelectItemPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("none");

  const { elements, selectedElements, setSelectedElements, setIsPanelOpen } =
    useSelectElementWidgetStore();

  const [tempSelectedElements, setTempSelectedElements] = useState<
    ElementItemType[]
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

  const toggleItem = (element: ElementItemType) => {
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
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>Select items</h3>
        <button
          className={styles.closeButton}
          onClick={() => setIsPanelOpen(false)}
        >
          X
        </button>
      </div>

      <div className={styles.filters}>
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
            <option value="100">&gt; 100</option>
            <option value="2500">&gt; 2500</option>
            <option value="10000">&gt; 10000</option>
          </select>
        </label>
      </div>

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <p className={styles.secondaryText}>No elements match your search.</p>
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
          />
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.selectedRow}>
          <span className={styles.secondaryText}>Current selected items:</span>
          <div className={styles.selectedItems}>
            {tempSelectedElements.map((el) => (
              <ElementItem
                key={el.id}
                name={el.name}
                onRemove={() => toggleItem(el)}
              />
            ))}
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectItemPanel;
