import SelectItemPanel from "./components/SelectItemPanel";
import type { ElementItem } from "./store/SelectElementWidgetStore";
import { useSelectElementWidgetStore } from "./store/SelectElementWidgetStore";

const elements: ElementItem[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Element ${i + 1}`,
}));

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

      {isPanelOpen && <SelectItemPanel elements={elements} />}
    </>
  );
}

export default App;
