import SelectItemPanel from "./components/SelectItemPanel";
import ElementItem from "./components/ElementItem";
import { useSelectElementWidgetStore } from "./store/SelectElementWidgetStore";
import styles from "./App.module.css";

function App() {
  const { isPanelOpen, setIsPanelOpen, selectedElements, setSelectedElements } =
    useSelectElementWidgetStore();

  return (
    <>
      <h1>Select items</h1>
      <p className={styles.itemCount}>
        You currently have {selectedElements.length} selected items.
      </p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        {selectedElements.map((el) => (
          <ElementItem
            key={el.id}
            name={el.name}
            onRemove={() =>
              setSelectedElements(
                selectedElements.filter((s) => s.id !== el.id),
              )
            }
          />
        ))}
      </div>
      <button
        className={styles.changeButton}
        style={{ marginBottom: "8px" }}
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        Change my choice
      </button>

      {isPanelOpen && <SelectItemPanel />}
    </>
  );
}

export default App;
