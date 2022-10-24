import React from "react";
import styles from "./styles/NavBar.module.css"
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function NavBar({ setActualPage }) {
  return (
    <div id={styles.header}>
      <img id={styles.img} src={"https://cdn-icons-png.flaticon.com/128/6469/6469203.png"} alt="Recipe" width="50px" height="50px" />
      <h1 id={styles.h1}>Recipes</h1>
      <div id={styles.divButtonCreate}>
        <Link to={"/recipes"}>
          <button id={styles.buttonCreate}>Create Recipe</button>
        </Link>
      </div>
      <div id={styles.SearchBar}>
        <SearchBar setActualPage={setActualPage} />
      </div>
    </div>
  )
}