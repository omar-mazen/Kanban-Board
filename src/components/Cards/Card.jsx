import DropIndicator from "../drop-indicator/DropIndicator";
import styles from "./cards.module.css";
import { motion } from "framer-motion";
export default function Card({ card, handleDragStart, column, index }) {
  return (
    <>
      <DropIndicator beforeId={card.id} column={column} />
      <motion.div
        column={card.column}
        card_id={card.id}
        draggable={true}
        className={styles.card}
        initial={{ opacity: 0.5 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5, delay: index / 10 },
        }}
        onDragStart={(e) => handleDragStart(e, card.id)}
      >
        <p>{card.title}</p>
      </motion.div>
    </>
  );
}
