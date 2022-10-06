import React from "react";
import styles from "./styles/Home.module.css"

export function Loading() {
  return (
    <div id={styles.loading}>
      <span id={styles.dot}></span>
      <span id={styles.dot}></span>
      <span id={styles.dot}></span>
    </div>
  )
}