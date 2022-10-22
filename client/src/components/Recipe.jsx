import React from "react";
import { Link, /* useHistory  */ } from "react-router-dom";
import styles from "./styles/Recipe.module.css"

export default function Recipe({ image, name, diets, id }) {
  // const history = useHistory()

  // const handleButton = (e) => {
  //   e.preventDefault()
  //   history.push(`/home/${id}`)
  // }

  return (
    // <div id={styles.cardRecipe}>
    //   <img src={image} alt="Receta" width="300px" id={styles.image} />
    //   <h3 id={styles.h3}>{name}</h3>
    //   <label id={styles.label}>Diets: </label>
    //   {diets?.map((d) => (
    //     <p id={styles.p} key={d}>
    //       {d.charAt(0).toUpperCase() + d.slice(1)}
    //     </p>
    //   ))}
    //   <br />
    //   <button id={styles.buttonRecipe} onClick={(e) => handleButton(e)}>See details</button>
    // </div>
    <Link to={`/home/${id}`}>
      <div id={styles.cardRecipe}>
        <img src={image} alt="Receta" width="300px" id={styles.image} />
        <h3 id={styles.h3}>{name}</h3>
        <label id={styles.label}>Diets: </label>
        {diets?.map((d) => (
          <p id={styles.p} key={d}>
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </p>
        ))}
        {/* <br />
        <button id={styles.buttonRecipe} onClick={(e) => handleButton(e)}>See details</button> */}
      </div>

    </Link>
  )
}