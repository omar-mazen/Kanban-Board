import styles from "./Header.module.css";
import { motion } from "framer-motion";
export default function Header({ title, color, count = 0 }) {
  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 2 },
      }}
    >
      <h2 style={{ color }}>{title}</h2>
      <span>{count}</span>
    </motion.div>
  );
}
