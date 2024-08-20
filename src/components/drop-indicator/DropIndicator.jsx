import styles from "./dropIndicator.module.css";

export default function DropIndicator({ beforeId, column }) {
  return (
    <div
      className={`${styles["drop-indicator"]}`}
      data-before={beforeId}
      data-column={column}
    ></div>
  );
}
