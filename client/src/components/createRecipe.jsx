import React from "react";
import {Link, useHistory} from "react-router-dom"
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {getDietsTypes, postRecipe } from "../actions/index"
import styles from "./styles/CreateRecipe.module.css"

export default function CreateRecipe(){
  const dispatch = useDispatch()
  const history = useHistory()
  let recipes = useSelector(state => state.recipes)
  const dietsTypes = useSelector(state => state.diets)

  const [input, setInput] = useState({
    name:"",
    summary:"",
    healthScore:"",
    steps:"",
    image:"",
    diets:[]
  })


  useEffect(()=>{
    dispatch(getDietsTypes())
  }, [dispatch])


  const handleChange = (e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

    const handleSelect = (e)=>{
      setInput({
        ...input,
        diets: [...new Set ([...input.diets, e.target.value])]
      })
    console.log(input.diets)
  }


  const handleDeleteDiets = (e) => {
    setInput({
      ...input,
      diets: input.diets.filter((el) => el !== e),
    });
  };


  let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;

  const handleSubmit = (e)=>{
   e.preventDefault();
    if (input.name.trim() || input.name === 'number') {
      return alert("Enter correct a name");
    } 
    else if (
      recipes.find(
        (e) => e.name.toLowerCase().trim() === input.name.toLocaleLowerCase().trim()
      )
    ) {
      return alert(`The name ${input.name} already exists`);
    } else if (input.summary.trim() === "") {
      return alert("Please add a summary");
    } else if (input.healthScore === "" || input.healthScore < 1 || input.healthScore > 100) {
      return alert("The value must be between 1 and 100");
    } else if (input.steps.length === 0) {
      return alert("Please add the steps");
    }  else if (input.image && !validateUrl.test(input.image)) {
      return alert("This is not a valid URL"); 
     } else if (input.diets.length === 0) {
      return alert("Please add one o more diets");
    } else {
      dispatch(postRecipe(input));
      alert("Recipe created");
      setInput({
       name:"",
       summary:"",
       healthScore:"",
       steps:"",
       image:"",
       diets:[]
      });
      history.push("/home");
    }
  }


  return (
    <div id={styles.createRecipe}>
      <Link to={"/home"}>
        <button id={styles.buttonBack}>Back</button>
      </Link>
      <h1 id={styles.h1}>Create your recipe!</h1>
      <form id={styles.form} onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label id={styles.label}>Name: </label>
          <input id={styles.input} type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}/>
        </div>
        <div>
          <label id={styles.label}>Summary: </label>
           <textarea id={styles.input} type="text" value={input.summary} name="summary" onChange={(e)=>handleChange(e)}></textarea>
        </div>
        <div>
          <label id={styles.label}>Health Score: </label>
          <input id={styles.input} type="number"  value={input.healthScore} name="healthScore" onChange={(e)=>handleChange(e)}/>
        </div>
        <div>
          <label id={styles.label}>Steps: </label>
          <textarea id={styles.input} type="text" value={input.steps} name="steps" onChange={(e)=>handleChange(e)}></textarea>
        </div>
        <div>
          <label id={styles.label} >Image: </label>
          <input id={styles.input} type="text" value={input.image} name="image" onChange={(e)=>handleChange(e)}></input>
        </div>
        <div>
            <label id={styles.label}>Diets: </label>
          <select id={styles.selectForm} onChange={(e)=>handleSelect(e)}>
            <option disabled selected>Select diets...</option>
            {dietsTypes?.map((d)=>(
              <option value={d.name} key={d.id}>{d.name}</option>
            ))}
         </select>
         <ul>
            {input.diets.map((d) => (
              <div key={d}>
                  <div>{d + ""}</div>
                <button value={d} onClick={() => handleDeleteDiets(d)}>x </button>
              </div>
            ))}
          </ul>
        </div>
         <button id={styles.buttonForm} type="submit">Create Recipe</button>
      </form>
    </div>
  )
}