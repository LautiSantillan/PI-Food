import React from "react";
import { Link } from "react-router-dom"
import styles from "../LandingPage/LandingPage.module.css"


function LandingPage() {
  return (
    <div id={styles.background}>
      <div id={styles.container}>
        <h1 id={styles.h1}>Welcome to the Food App</h1>
      </div>
      <Link to="/home" >
        <button id={styles.button}>Explore</button>
      </Link>
    </div>
  )
}

export default LandingPage
