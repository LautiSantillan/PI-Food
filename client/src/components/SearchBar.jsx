import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../actions";
import styles from "./styles/SearchBar.module.css"

export default function SearchBar() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  const handleInputName = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getRecipeByName(name))
    setName("")
  }

  return (
    <div id={styles.SearchBar}>
      <input id={styles.input} type="text" placeholder="Search..." onChange={handleInputName} value={name} />
      <button id={styles.buttonSearch} type="submit" onClick={handleSubmit}>Search</button>
    </div>
  )
}