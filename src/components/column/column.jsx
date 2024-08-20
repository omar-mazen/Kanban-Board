import { useState } from "react";
import styles from "./column.module.css";
import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import AddCard from "../Cards/AddCard";
import { motion } from "framer-motion";

function getIndicators(column) {
  return Array.from(document.querySelectorAll(`[data-column=${column}]`));
}
function getNearestIndicator(e, indicators) {
  const DISTANCE_OFFSET = 50;

  const el = indicators.reduce(
    (closest, child) => {
      // Get the position of the indicator on the screen as x, y values,as well as the top and bottom values.
      const box = child.getBoundingClientRect();

      const offset = e.clientY - (box.top + DISTANCE_OFFSET);
      // If the current child is nearer than "closest", set the current child as the closest.
      // Otherwise, keep the current closest.
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    }
  );
  return el;
}
function highlightIndicator(column, e) {
  const indicators = getIndicators(column);
  clearHighlights(column, indicators);
  const { element } = getNearestIndicator(e, indicators);
  element.style.opacity = 1;
}
function clearHighlights(column, indicators) {
  const ind = indicators || getIndicators(column);
  ind.forEach((el) => {
    el.style.opacity = 0;
  });
}

export default function Column({ title, cards, setCards, color }) {
  const [isActive, setActive] = useState(false);
  const filteredCards = cards.filter((card) => card.column == title);

  // Start dragging the card
  function handleDragStart(e, id) {
    e.dataTransfer.setData("cardId", id);
  }
  // Card is being dragged over the column
  function handleDragOver(e) {
    e.preventDefault();
    const relatedTarget = e.relatedTarget;
    if (!e.currentTarget.contains(relatedTarget)) {
      setActive(true);
      // Get the nearest indicator and highlight it
      highlightIndicator(title, e);
    }
  }
  // Card has left the column during drag
  function handleDragLeave(e) {
    e.preventDefault();
    const relatedTarget = e.relatedTarget;
    if (!e.currentTarget.contains(relatedTarget)) {
      setActive(false);
      clearHighlights(title);
    }
  }
  // Card has been dropped
  function handleDrop(e) {
    // Get the card ID which was set in the handleDragStart function
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights(title);

    // Get the nearest indicator to identify the card before which the dragged card should be placed.
    const indicators = getIndicators(title);
    const { element } = getNearestIndicator(e, indicators);
    // If the ID has no value, then it is the last indicator in the column,
    // meaning that we want to move the card to the end of the row.
    const before = element.dataset.before || -1;

    if (before != cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c.id == cardId);
      if (!cardToTransfer) return;
      // Set the new column value
      cardToTransfer = { ...cardToTransfer, column: title };
      // Delete the card from the copy
      copy = copy.filter((c) => c.id !== cardId);
      // Set it at the end of the array if before == -1
      if (before == -1) copy.push(cardToTransfer);
      else {
        // Get the index of the card where id == before
        const newIndex = copy.findIndex((c) => c.id == before);
        // Insert the dragged card before the card where id == before
        copy.splice(newIndex, 0, cardToTransfer);
      }
      setCards(copy);
    }
  }

  return (
    <motion.div
      className={`${styles.column} ${isActive ? styles.active : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Header title={title} color={color} count={filteredCards.length} />
      <Cards
        cards={filteredCards}
        handleDragStart={handleDragStart}
        column={title}
      />
      <AddCard column={title} setCards={setCards} />
    </motion.div>
  );
}
