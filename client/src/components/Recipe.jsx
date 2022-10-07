import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Recipe.module.css"

export default function Recipe({ image, name, diets, id }) {
  return (
    <div id={styles.cardRecipe}>
      <img src={image} alt="Receta" width="300px" id={styles.image} />
      <h3 id={styles.h3}>{name}</h3>
      {/* <div id={styles.diets_div}>
        <div id={styles.diets}>
          <p id={styles.p}>Diets:</p>
          {diets?.map((d) => (
            // <span>{d}</span>
            <p id={styles.p} key={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </p>
          ))}
        </div> */}


      <label id={styles.label}>Diets: </label>
      {diets?.map((d) => (
        // <span>{d}</span>
        <p id={styles.p} key={d}>
          {d.charAt(0).toUpperCase() + d.slice(1)}
        </p>
      ))}
      <br />
      <Link to={`/home/${id}`}>
        <button id={styles.buttonRecipe}>See details</button>
      </Link>
    </div>
  )
}