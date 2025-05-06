import * as React from "react";
import styles from "./layout.module.css";

export default ({ children }) => (
  <main className={styles.root}>
    <h1>Subscribe to newsletter</h1>
    {children}
  </main>
);
