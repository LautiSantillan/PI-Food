import React from "react";
import styles from "./styles/Paginado.module.css"
import { /* useSelector */useDispatch } from "react-redux"
import { setCurrentPage } from "../actions";

export default function Paginado({ recipesPerPage, allRecipes, actualPage, setActualPage }) {
  const dispatch = useDispatch()
  // const currentPage = useSelector(state => state.currentPage)
  const pageNumbers = []

  // const handlePaginado = (event, number) => {
  //   event.preventDefault()
  //   dispatch(setCurrentPage(number))
  // }

  const handlePaginado = (event, number) => {
    event.preventDefault()
    dispatch(setCurrentPage(number))
    setActualPage(number)
  }

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={styles.nav}>
      <ul>
        {
          pageNumbers?.map((number => {
            return <button className={number === actualPage ? styles.pagActual : styles.pagOther} onClick={(event) => handlePaginado(event, number)} key={number}>{number}</button>
          }))
        }
      </ul>
    </nav>
  )

}

