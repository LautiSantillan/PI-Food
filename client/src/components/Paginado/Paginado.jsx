import React from "react";
import styles from "../Paginado/Paginado.module.css"
import { setPage } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux"


export default function Paginado() {
  const dispatch = useDispatch()
  const recipes = useSelector(state => state.recipes)
  const recipesPerPage = useSelector(state => state.recipesPerPage)
  const currentPage = useSelector(state => state.currentPage)

  const pageNumbers = []
  const allRecipes = recipes?.length

  // const handlePaginado = (event, number) => {
  //   event.preventDefault()
  //   dispatch(setCurrentPage(number))
  // }

  // const handlePaginado = (event, number) => {
  //   event.preventDefault()
  //   dispatch(setCurrentPage(number))
  //   setActualPage(number)
  // }

  const handlePaginado = (e) => {
    dispatch(setPage(parseInt(e.target.innerHTML)))
  }

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={styles.nav}>
      <ul>
        {
          pageNumbers?.map((number => {
            return <button className={number === currentPage ? styles.pagActual : styles.pagOther} onClick={handlePaginado} key={number}>{number}</button>
          }))
        }
      </ul>
    </div>
  )

}

