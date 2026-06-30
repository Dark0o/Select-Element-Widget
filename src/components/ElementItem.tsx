import styles from "./ElementItem.module.css";

interface Props {
  name: string;
  onRemove: () => void;
}

const ElementItem = ({ name, onRemove }: Props) => {
  return (
    <div className={styles.badge}>
      <span>{name}</span>
      <div className={styles.divider} />
      <button className={styles.removeButton} onClick={onRemove}>
        ×
      </button>
    </div>
  );
};

export default ElementItem;
