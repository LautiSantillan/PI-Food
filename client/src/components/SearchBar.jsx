import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../actions";


export default function SearchBar(){
const dispatch = useDispatch()
const [name, setName] = useState("")

const handleInputName = (e)=>{
    e.preventDefault()
    setName(e.target.value)
}

const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(getRecipeByName(name))
    setName("")
}

return (
    <div>
        <input type="text" placeholder="Search..." onChange={handleInputName} value={name}/>
        <button type="submit" onClick={handleSubmit}>Search</button>
    </div>
)
}