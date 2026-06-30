import { type RowComponentProps } from "react-window";
import type { ElementItemType } from "../store/SelectElementWidgetStore";
import styles from "./RowComponent.module.css";

interface RowProps {
  elements: ElementItemType[];
  isItemSelected: (id: number) => boolean;
  toggleItem: (element: ElementItemType) => void;
  tempSelectedElements: ElementItemType[];
}

const RowComponent = ({
  index,
  elements,
  isItemSelected,
  toggleItem,
  tempSelectedElements,
  style,
}: RowComponentProps<RowProps>) => {
  const element = elements[index];

  return (
    <div style={style} className={styles.row}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={isItemSelected(element.id)}
          disabled={
            tempSelectedElements.length >= 3 && !isItemSelected(element.id)
          }
          onChange={() => toggleItem(element)}
        />
        {element.name}
      </label>
    </div>
  );
};

export default RowComponent;
