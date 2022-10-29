import React from "react";
import { useHistory, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDietsTypes, updateRecipe } from "../actions/index"
import styles from "./styles/UpdateRecipe.module.css"
import NavBarHome from "./navbarhome";

export default function UpdateRecipe() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()
  let allRecipes = useSelector(state => state.allRecipes)
  const dietsTypes = useSelector(state => state.diets)

  const [errors, setErrors] = useState({})

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: [],
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

  const handleSteps = (e) => {
    setInput({
      ...input,
      steps: [{ step: e.target.value }]
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }


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
    console.log(id)
    console.log(input)

    if (Object.values(error).length !== 0) {
    } else {
      dispatch(updateRecipe(id, input));
      alert("The Recipe has been modified");
      setInput({
        name: "",
        summary: "",
        healthScore: "",
        steps: [],
        image: "",
        diets: []
      });
      history.push("/home");
    }
  }


  return (
    <div id={styles.createRecipe}>
      <NavBarHome />
      <form id={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div id={styles.divInput}>
          <h1 id={styles.h1}>Modify your recipe</h1>
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
          <textarea id={styles.input} type="text" value={input.steps.step} name="steps" onChange={(e) => handleSteps(e)}></textarea>
          {errors.steps && <h4 id={styles.error}>{errors.steps}</h4>}
        </div>
        <div>
          <label id={styles.label} >Image: </label>
          <input id={styles.input} type="text" value={input.image} name="image" onChange={(e) => handleChange(e)}></input>
          {errors.image && <h4 id={styles.error}>{errors.image}</h4>}
        </div>
        <div>
          <label id={styles.label}>Diets: </label>
          <select id={styles.selectForm} onChange={(e) => handleSelect(e)} defaultValue="default">
            <option disabled value="default">Select diets...</option>
            {dietsTypes?.map((d) => (
              <option value={d.name} key={d.id}>{d.name}</option>
            ))}
          </select>
          <div id={styles.divDiet}>
            {input.diets.map((d) => (
              <div key={d}>
                <div><h4 id={styles.selectDiet}>{d}</h4></div>
                <button id={styles.buttonDiet} value={d} onClick={() => handleDeleteDiets(d)}>x</button>
              </div>
            ))}
          </div>
          {errors.diets && <h4 id={styles.error}>{errors.diets}</h4>}
        </div>
        <button id={styles.buttonForm} type="submit">Modify Recipe</button>
      </form>
    </div>
  )
}