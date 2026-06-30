import SelectItemPanel from "./components/SelectItemPanel";
import { useSelectElementWidgetStore } from "./store/SelectElementWidgetStore";

function App() {
  const { isPanelOpen, setIsPanelOpen, selectedElements } =
    useSelectElementWidgetStore();

  return (
    <>
      <h1>Select items</h1>
      <p>You currently have {selectedElements.length} items selected.</p>
      <button onClick={() => setIsPanelOpen(!isPanelOpen)}>
        Change my choice
      </button>

      {isPanelOpen && <SelectItemPanel />}
    </>
  );
}

export default App;
