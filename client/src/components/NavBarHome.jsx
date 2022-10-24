import React from "react";
import styles from "./styles/NavBarHome.module.css"
import { useHistory } from "react-router-dom";

export default function NavBarHome() {
  const history = useHistory()

  const handleButton = (e) => {
    e.preventDefault()
    history.goBack()
  }

  return (
    <div id={styles.header}>
      <div id={styles.divButtonBack}>
        <button id={styles.buttonBack} onClick={(e) => handleButton(e)}> <img id={styles.img} src="https://cdn-icons-png.flaticon.com/128/507/507257.png" alt="" width="12px" height="12px" /> Back</button>
      </div>
    </div>
  )
}