import * as React from "react";
import styles from "./feedback.module.css";

export default ({ text }) => (
  <p className={styles.root}>{text}</p>
);
