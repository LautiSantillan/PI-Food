import React from "react";
import styles from "./styles/Paginado.module.css"

export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for (let i = 1; i<= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i)
    }
    
    return (
        <nav className={styles.nav}>
          <ul>
            {
              pageNumbers?.map((number =>{
                 return <button className={styles.Paginado} onClick={()=>paginado(number)} key={number}>{number}</button>
              }))
            }
          </ul>
        </nav>
    )
    
  }