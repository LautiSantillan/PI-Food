import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../actions";
import styles from "../SearchBar/SearchBar.module.css"

export default function SearchBar() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  const handleInputName = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(getRecipeByName(name))
    setName("")
  }

  return (
    <div id={styles.SearchBar}>
      <input id={styles.input} type="search" placeholder="Search Recipe..." onChange={(e) => handleInputName(e)} value={name} />
      <button id={styles.buttonSearch} type="submit" onClick={(e) => handleSubmit(e)}><img id={styles.img} src="https://cdn-icons-png.flaticon.com/128/1086/1086933.png" alt="icon" width="20px" height="20px" /></button>
    </div>
  )
}