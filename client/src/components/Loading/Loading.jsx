import React from "react";
import styles from "../Home/Home.module.css"

export default function Loading() {
  return (
    <div id={styles.loading}>
      <span id={styles.dot}></span>
      <span id={styles.dot}></span>
      <span id={styles.dot}></span>
    </div>
  )
}