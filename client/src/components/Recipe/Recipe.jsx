import React from "react";
import { Link } from "react-router-dom";
import styles from "../Recipe/Recipe.module.css"
import { useDispatch } from "react-redux"
import { deleteRecipe } from "../../actions/index";

export default function Recipe({ id, image, name, healthScore, diets, created }) {
  const dispatch = useDispatch()

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteRecipe(id))
  }


  return (
    <div>
      {created ?
        <Link to={`/home/${id}`}>
          <div id={styles.cardRecipe}>
            <img src={image} alt="Receta" width="300px" id={styles.image} />
            <h3 id={styles.h3}>{name}</h3>
            <div id={styles.divContainer}>
              <label>Health Score: <span>{healthScore}</span></label>
              <img src="https://cdn-icons-png.flaticon.com/128/4331/4331766.png" alt="healthscore" width="20px" />
            </div>
            <label id={styles.label2}>Diets: </label>
            {diets?.map((d) => (
              <p id={styles.p} key={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </p>
            ))}
            <br /><br />
            <Link to={`/updaterecipe/${id}`}><button id={styles.button1}>Modify</button></Link>
            <button id={styles.button2} onClick={(e) => handleDelete(e)}>Delete</button>
          </div>
        </Link>
        :
        <Link to={`/home/${id}`}>
          <div id={styles.cardRecipe}>
            <img src={image} alt="Receta" width="300px" id={styles.image} />
            <h3 id={styles.h3}>{name}</h3>
            <div id={styles.divContainer}>
              <label>Health Score: <span>{healthScore}</span></label>
              <img src="https://cdn-icons-png.flaticon.com/128/4331/4331766.png" alt="healthscore" width="20px" />
            </div>
            <label id={styles.label2}>Diets: </label>
            {diets?.map((d) => (
              <p id={styles.p} key={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </p>
            ))}
          </div>
        </Link>
      }
    </div>




  )
}