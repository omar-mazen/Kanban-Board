import DropIndicator from "../drop-indicator/DropIndicator";
import Card from "./Card";
import styles from "./cards.module.css";
export default function Cards({ cards, column, handleDragStart }) {
  return (
    <div className={styles.cards}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          handleDragStart={handleDragStart}
          column={column}
          index={index}
        />
      ))}
      <DropIndicator beforeId={null} column={column} />
    </div>
  );
}
