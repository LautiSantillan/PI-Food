import React from "react";
import { Link, useHistory } from "react-router-dom"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDietsTypes, postRecipe } from "../actions/index"
import styles from "./styles/CreateRecipe.module.css"

export default function CreateRecipe() {
  const dispatch = useDispatch()
  const history = useHistory()
  let allRecipes = useSelector(state => state.allRecipes)
  const dietsTypes = useSelector(state => state.diets)

  const [errors, setErrors] = useState({})

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: "",
    diets: []
  })


  useEffect(() => {
    dispatch(getDietsTypes())
  }, [dispatch])


  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      diets: [...new Set([...input.diets, e.target.value])]
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }


  const handleDeleteDiets = (e) => {
    setInput({
      ...input,
      diets: input.diets.filter((el) => el !== e),
    });
  };


  let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;


  function validate(input) {
    let errors = {};

    if (!input.name.trim()) {
      errors.name = "Enter a correct name";
    } else if (
      allRecipes.find(
        (e) =>
          e.name.toLowerCase().trim() === input.name.toLocaleLowerCase().trim()
      )
    ) {
      errors.name = `The ${input.name} already exists`;
    } else if (
      // input.summary === "number" ||
      input.summary.length < 40 ||
      input.summary.trim() === ""
    ) {
      errors.summary = "Enter a correct summary";
    } else if (input.healthScore === "" || input.healthScore < 1 || input.healthScore > 100) {
      errors.healthScore = "Enter a healthScore";
    } else if (input.steps.length === 0) {
      errors.steps = "Enter a correct steps"
    } else if (!input.image || !validateUrl.test(input.image)) {
      errors.image = "This is not a valid URL";
    }
    else if (input.diets.length === 0) {
      errors.diets = "Select one or more diets";
    }
    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(input));
    let error = validate(input);

    if (Object.values(error).length !== 0) {
    } else {
      dispatch(postRecipe(input));
      alert("A new Recipe has been created");
      setInput({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: []
      });
      history.push("/home");
    }
  }






  // const handleSubmit = (e)=>{
  //  e.preventDefault();
  //   if (!input.name.trim()) {
  //     return alert("Please add a name");
  //   } 
  //   else if (
  //     recipes.find(
  //       (e) => e.name.toLowerCase().trim() === input.name.toLocaleLowerCase().trim()
  //     )
  //   ) {
  //     return alert(`The name ${input.name} already exists`);
  //   } else if (input.summary.trim() === "") {
  //     return alert("Please add a summary");
  //   } else if (input.healthScore === "" || input.healthScore < 1 || input.healthScore > 100) {
  //     return alert("The value must be between 1 and 100");
  //   } else if (input.steps.length === 0) {
  //     return alert("Please add the steps");
  //   }  else if (input.image && !validateUrl.test(input.image)) {
  //     return alert("This is not a valid URL"); 
  //    } else if (input.diets.length === 0) {
  //     return alert("Please add one o more diets");
  //   } else {
  //     dispatch(postRecipe(input));
  //     alert("Recipe created");
  //     setInput({
  //      name:"",
  //      summary:"",
  //      healthScore:"",
  //      steps:"",
  //      image:"",
  //      diets:[]
  //     });
  //     history.push("/home");
  //   }
  // }


  return (
    <div id={styles.createRecipe}>
      <Link to={"/home"}>
        <button id={styles.buttonBack}>Back</button>
      </Link>
      <h1 id={styles.h1}>Create your recipe!</h1>
      <form id={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label id={styles.label}>Name: </label>
          <input id={styles.input} type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
          {errors.name && <h4 id={styles.error}>{errors.name}</h4>}
        </div>
        <div>
          <label id={styles.label}>Summary: </label>
          <textarea id={styles.input} type="text" value={input.summary} name="summary" onChange={(e) => handleChange(e)}></textarea>
          {errors.summary && <h4 id={styles.error}>{errors.summary}</h4>}
        </div>
        <div>
          <label id={styles.label}>Health Score: </label>
          <input id={styles.input} type="number" value={input.healthScore} name="healthScore" onChange={(e) => handleChange(e)} />
          {errors.healthScore && <h4 id={styles.error}>{errors.healthScore}</h4>}
        </div>
        <div>
          <label id={styles.label}>Steps: </label>
          <textarea id={styles.input} type="text" value={input.steps} name="steps" onChange={(e) => handleChange(e)}></textarea>
          {errors.steps && <h4 id={styles.error}>{errors.steps}</h4>}
        </div>
        <div>
          <label id={styles.label} >Image: </label>
          <input id={styles.input} type="text" value={input.image} name="image" onChange={(e) => handleChange(e)}></input>
          {errors.image && <h4 id={styles.error}>{errors.image}</h4>}
        </div>
        <div>
          <label id={styles.label}>Diets: </label>
          <select id={styles.selectForm} onChange={(e) => handleSelect(e)}>
            <option disabled selected>Select diets...</option>
            {dietsTypes?.map((d) => (
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
          {errors.diets && <h4 id={styles.error}>{errors.diets}</h4>}
        </div>
        <button id={styles.buttonForm} type="submit">Create Recipe</button>
      </form>
    </div>
  )
}