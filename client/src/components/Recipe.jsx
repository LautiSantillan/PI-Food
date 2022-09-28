import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/Recipe.module.css"

export default function Recipe ({image, name, diets, id}){
    return (
        <div id={styles.cardRecipe}>
             <img src={image} alt="Receta" width="300px" id={styles.image}/>
             <h3>{name}</h3>
             <div id={styles.diets_div}>
               <div id={styles.diets}>
                <p id={styles.p}>Diets:</p>
                {diets?.map((d) => (
                 <span>{d}</span>
                ))}
               </div>
             <Link to={`/home/${id}`}>
               <button id={styles.button}>See details</button>
            </Link>
            </div>
        </div>
    )
}