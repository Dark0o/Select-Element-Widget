import styles from "./ElementItem.module.css";

interface Props {
  name: string;
  onRemove: () => void;
  disabled?: boolean;
}

const ElementItem = ({ name, onRemove, disabled }: Props) => {
  return (
    <div className={styles.badge}>
      <span>{name}</span>
      {!disabled && (
        <>
          <div className={styles.divider} />
          <button className={styles.removeButton} onClick={onRemove}>
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default ElementItem;
