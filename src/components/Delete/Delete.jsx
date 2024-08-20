import styles from "./Delete.module.css";
import { useEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion } from "framer-motion";

import TrashBody from "../../icon/TrashBody";
import TrashCover from "../../icon/TrashCover";
import CrumpledPapperIcon from "../../icon/CrumpledPapper";
import Check from "../../icon/Check";

export default function Delete({ setCards }) {
  const [isActive, setActive] = useState(false);
  const [isLeaving, setLeaving] = useState(false);
  const [isDropped, setDropped] = useState(false);
  const checkIconRef = useRef();
  const wraperRef = useRef();
  const trashIconRef = useRef();
  useEffect(() => {
    if (isActive)
      animate([
        [
          wraperRef.current,
          {
            backgroundColor: "rgba(157, 26, 26, 0.4)",
          },
          { duration: 0.5 },
        ],
      ]);
    if (isLeaving)
      animate([
        [
          wraperRef.current,
          {
            backgroundColor: "rgba(154, 153, 153, 0.122)",
          },
          { duration: 0.5 },
        ],
      ]);
    if (isDropped)
      animate([
        [
          trashIconRef.current,
          { opacity: 0, rotate: 720, scale: 0 },
          { delay: 0.75, duration: 0.5 },
        ],
        [
          checkIconRef.current,
          { opacity: 1, rotate: -720, scale: 1 },
          { duration: 0.5, delay: 0.75, at: "<" },
        ],
        [
          wraperRef.current,
          { backgroundColor: "#4caf50" },
          { duration: 0.5, delay: 1, at: "<" },
        ],
        [
          checkIconRef.current,
          { opacity: 0, rotate: 720, scale: 0 },
          { duration: 0.5, delay: 1 },
        ],
        [
          wraperRef.current,
          { backgroundColor: "rgba(154, 153, 153, 0.122)" },
          { duration: 0.5, delay: 1, at: "<" },
        ],
        [
          trashIconRef.current,
          { opacity: 1, rotate: -720, scale: 1 },
          { duration: 0.5, delay: 1, at: "<" },
        ],
      ]).then(() => setDropped(false));
  }, [isDropped, isActive]);
  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    setActive(true);
    setDropped(false);
    setLeaving(false);
  }
  function handleDragLeave(e) {
    e.preventDefault();
    const relatedTarget = e.relatedTarget;
    if (!e.currentTarget.contains(relatedTarget)) {
      setActive(false);
      setLeaving(true);
    }
  }
  function handleDrop(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    setCards((cards) => cards.filter((card) => card.id != cardId));
    setDropped(true);
    setTimeout(() => {
      setActive(false);
    }, 100);
  }
  return (
    <motion.div
      className={styles.delete}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      ref={wraperRef}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 2 },
      }}
    >
      <motion.div
        className={styles.trash}
        initial={{ opacity: 0, scale: 0 }}
        ref={checkIconRef}
      >
        <Check size={50} />
      </motion.div>
      <motion.div className={styles.trash} ref={trashIconRef}>
        <motion.div
          variants={coverIcon}
          animate={isActive ? "animate" : ""}
          className={styles.cover}
        >
          <TrashCover />
        </motion.div>
        <AnimatePresence>
          {isActive && (
            <motion.div
              style={{ position: "absolute", top: "-10px", zIndex: "0" }}
              variants={paperIcon}
              initial={"initial"}
              animate={"animate"}
              exit={isDropped ? "drop" : "exit"}
            >
              <CrumpledPapperIcon />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.body}>
          <TrashBody />
        </div>
      </motion.div>
    </motion.div>
  );
}
const coverIcon = {
  animate: {
    transform: "translateX(-10px) translateY(-20px) rotate(-35deg)",
    transition: { ease: "easeInOut", duration: 0.5 },
  },
};
const paperIcon = {
  initial: { opacity: 0, display: "none", filter: "blur(3px)" },
  animate: {
    opacity: 1,
    x: [110, 0],
    y: [0, -15, -25, -15, 10],
    filter: "blur(0px)",
    rotate: 360,
    display: "block",
    transition: { duration: 1, ease: "linear" },
  },
  exit: {
    opacity: 0,
    x: [0, 110],
    y: [10, -15, -25, -15, 0],
    rotate: -360,
    filter: "blur(3px)",
    transition: { duration: 1, ease: "linear" },
  },
  drop: {
    y: 10,
    opacity: 0,
    transition: { duration: 0.1 },
  },
};
