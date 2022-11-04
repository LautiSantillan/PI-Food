import React from "react";
import styles from "../Paginado/Paginado.module.css"



export default function Paginado({ recipesPerPage, allRecipes, currentPage, /* setActualPage */ paginado }) {
  // const dispatch = useDispatch()
  const pageNumbers = []

  // const handlePaginado = (event, number) => {
  //   event.preventDefault()
  //   dispatch(setCurrentPage(number))
  // }

  // const handlePaginado = (event, number) => {
  //   event.preventDefault()
  //   dispatch(setCurrentPage(number))
  //   setActualPage(number)
  // }

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={styles.nav}>
      <ul>
        {
          pageNumbers?.map((number => {
            return <button className={number === currentPage ? styles.pagActual : styles.pagOther} onClick={() => paginado(number)} /* onClick={(event) => handlePaginado(event, number)} */ key={number}>{number}</button>
          }))
        }
      </ul>
    </div>
  )

}

