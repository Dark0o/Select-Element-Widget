import { type RowComponentProps } from "react-window";
import type { ElementItemType } from "../store/SelectElementWidgetStore";
import styles from "./RowComponent.module.css";

export const MAX_SELECTED_ITEMS = 3;

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
  const isDisabled =
    tempSelectedElements.length >= MAX_SELECTED_ITEMS &&
    !isItemSelected(element.id);

  return (
    <div style={style} className={styles.row}>
      <label
        className={isDisabled ? styles.labelDisabled : styles.label}
      >
        <input
          type="checkbox"
          checked={isItemSelected(element.id)}
          disabled={isDisabled}
          onChange={() => toggleItem(element)}
        />
        <span className={isDisabled ? styles.disabledText : undefined}>
          {element.name}
        </span>
      </label>
    </div>
  );
};

export default RowComponent;
