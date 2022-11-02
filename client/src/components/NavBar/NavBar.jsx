import React from "react";
import styles from "../NavBar/NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

export default function NavBar({ paginado }) {
  return (
    <div id={styles.header}>
      <div id={styles.divContainer}>
        <img id={styles.img} src={"https://cdn-icons-png.flaticon.com/128/6469/6469203.png"} alt="Recipe" width="50px" height="50px" />
        <h2 id={styles.h1}>Recipes</h2>
      </div>
      <div id={styles.divButtonCreate}>
        <Link to={"/recipes"}>
          <button id={styles.buttonCreate}>Create Recipe</button>
        </Link>
        <SearchBar paginado={paginado} />
      </div>
    </div>
  )
}