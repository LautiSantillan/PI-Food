import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, /* setPage */ } from "../actions";
import styles from "./styles/SearchBar.module.css"

export default function SearchBar({ paginado }) {
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  const handleInputName = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getRecipeByName(name))
    // setCurrentPage(1)
    // dispatch(setPage(1))
    paginado(1)
    setName("")
  }

  return (
    <div id={styles.SearchBar}>
      <input id={styles.input} type="text" placeholder="Search Recipe..." onChange={handleInputName} value={name} />
      <button id={styles.buttonSearch} type="submit" onClick={handleSubmit}><img id={styles.img} src="https://cdn-icons-png.flaticon.com/128/1086/1086933.png" alt="icon" width="20px" height="20px" /></button>
    </div>
  )
}