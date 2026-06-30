import { useState } from "react";
import SelectItemPanel from "./components/SelectItemPanel";
import type { ElementItem } from "./store/SelectElementWidgetStore";
import { useSelectElementWidgetStore } from "./store/SelectElementWidgetStore";

const elements: ElementItem[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Element ${i + 1}`,
}));

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const { selectedElements } = useSelectElementWidgetStore();

  console.log(elements);
  return (
    <>
      <h1>Select items</h1>
      <p>You currently have {selectedElements.length} items selected.</p>
      <button onClick={() => setIsOpen(!isOpen)}>Change my choice</button>

      {isOpen && <SelectItemPanel elements={elements} />}
    </>
  );
}

export default App;
