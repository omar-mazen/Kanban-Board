import styles from "./cards.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AddCard({ setCards, column }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  function onSubmit(e) {
    e.preventDefault();
    if (title.trim().length > 0)
      setCards((cards) => [
        ...cards,
        { title, id: (Math.random() * 1000).toFixed(0), column },
      ]);
    setTitle("");
    setIsAdding(false);
  }
  return (
    <AnimatePresence>
      {isAdding ? (
        <motion.form
          className={styles["add-task-form"]}
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Add new task ..."
          />
          <div className={styles["task-actions"]}>
            <button
              type="submit"
              className={styles["add-button"]}
              disabled={title.trim().length <= 0}
            >
              + Add
            </button>
            <button
              className={styles["cancel-button"]}
              type="reset"
              onClick={() => {
                setTitle("");
                setIsAdding(false);
              }}
            >
              Cancel
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          className={styles["show-add-task"]}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.5 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          onClick={() => {
            setIsAdding(true);
          }}
        >
          + Add task
        </motion.button>
      )}
    </AnimatePresence>
  );
}
