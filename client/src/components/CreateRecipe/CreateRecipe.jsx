import React from "react";
import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { cleanRecipes, getDietsTypes, getRecipes, postRecipe, setPage } from "../../actions/index"
import styles from "./CreateRecipe.module.css"
import NavBarHome from "../NavBarHome/NavBarHome";
import swal from "sweetalert";
var number = 0;


export default function CreateRecipe() {
  const dispatch = useDispatch()
  const history = useHistory()
  let allRecipes = useSelector(state => state.recipes)
  const dietsTypes = useSelector(state => state.diets)

  const [instruction, setInstruction] = useState("");


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

  // const handleSteps = (e) => {
  //   setInput({
  //     ...input,
  //     steps: [{ step: e.target.value }]
  //   })
  //   setErrors(
  //     validate({
  //       ...input,
  //       [e.target.name]: e.target.value,
  //     })
  //   );
  // }

  const handleChangeInstruction = (e) => {
    const value = e.target.value;
    setInstruction(value);
  };

  const handleAddInstruction = (e) => {
    if (instruction) {
      setInput({
        ...input,
        steps: [...input.steps, { num: number++, step: `Step ${number}: ${instruction}` }],
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
      setInstruction("");
    }
  };

  const handleDeleteSteps = (e) => {
    setInput({
      ...input,
      steps: input.steps.filter((el) => el !== e),
    });
  };


  let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;


  function validate(input) {
    let errors = {};

    if (!input.name.trim()) {
      errors.name = "Enter a correct name";
    } else if (
      allRecipes.find((e) => e.name.toLowerCase().trim().includes(input.name.toLowerCase().trim()))
    ) {
      errors.name = `The ${input.name} already exists`;
    } else if (
      input.summary.length < 10 ||
      input.summary.trim() === ""
    ) {
      errors.summary = "Enter a correct summary";
    } else if (input.healthScore === "" || input.healthScore < 1 || input.healthScore > 100) {
      errors.healthScore = "Enter a correct health score";
    } else if (input.steps.length === 0) {
      errors.steps = "Enter a correct steps"
    } else if (!input.image || !validateUrl.test(input.image)) {
      errors.image = "This is not a valid URL";
    } else if (input.diets.length < 1) {
      errors.diets = "Select one or more diets";
    } else if (input.diets.length > 4) {
      errors.diets = "Your recipe can not have more than 4 diets!";
    }
    let result = Object.keys(errors).length > 0 ? errors : true;
    return result;
    // return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(input));
    let error = validate(input);

    if (Object.values(error).length !== 0) {
    } else {
      dispatch(postRecipe(input));
      await swal("The recipe has been created", "Recipe created with success", "success");
      setInput({
        name: "",
        summary: "",
        healthScore: "",
        steps: [],
        image: "",
        diets: []
      });
      history.push("/home");
      dispatch(cleanRecipes())
      dispatch(getRecipes())
      dispatch(setPage(1))
    }
  }


  return (
    <div id={styles.createRecipe}>
      <NavBarHome />
      <div id={styles.divContainer}>
        <form id={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <div id={styles.divH1}>
            <h1 id={styles.h1}>Create your recipe!</h1>
          </div>
          <div>
            <label id={styles.label}>Name: </label>
            <input id={styles.input} type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} placeholder="Name..." />
            {errors.name && <h4 id={styles.error}>{errors.name}</h4>}
          </div>
          <label id={styles.label}>Summary: </label>
          <div>
            <textarea id={styles.input} type="text" value={input.summary} name="summary" onChange={(e) => handleChange(e)} placeholder="Summary..."></textarea>
            {errors.summary && <h4 id={styles.error}>{errors.summary}</h4>}
          </div>
          <div>
            <label id={styles.label}>Health Score: </label>
            <input id={styles.input} type="number" value={input.healthScore} name="healthScore" onChange={(e) => handleChange(e)} placeholder="Between 1 and 100..." />
            {errors.healthScore && <h4 id={styles.error}>{errors.healthScore}</h4>}
          </div>
          <label id={styles.label}>Steps: </label>
          <div>
            <textarea id={styles.inputButtonAdd} type="text" value={input.steps.step} name="steps" onChange={handleChangeInstruction}
              maxLength={80} placeholder="Add step..."></textarea>
            <div>
              <button id={styles.buttonAdd} type='button' onClick={handleAddInstruction}>
                Add step
              </button>
            </div>
            <div>
              {input.steps.map((el, idx) => {
                return <div>
                  <p id={styles.p} key={idx}>{`${el.step}`}</p>
                  <button id={styles.buttonDiet} value={el} onClick={() => handleDeleteSteps(el)}>x</button>
                </div>
              })}
            </div>
            {errors.steps && <h4 id={styles.error}>{errors.steps}</h4>}
          </div>
          <div>
            <label id={styles.labelImage}>Image: </label>
            <input id={styles.input} type="text" value={input.image} name="image" onChange={(e) => handleChange(e)} placeholder="Enter a url..."></input>
            {errors.image && <h4 id={styles.error}>{errors.image}</h4>}
          </div>
          <label id={styles.label}>Diets: </label>
          <div>
            <select id={styles.selectForm} onChange={(e) => handleSelect(e)} defaultValue="default">
              <option disabled value="default" > Select diets...</option>
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
          <button id={styles.buttonForm} type="submit">Create Recipe</button>
        </form>
      </div>
    </div>
  )
}