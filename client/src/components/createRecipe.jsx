import React from "react";
import {Link, useHistory} from "react-router-dom"
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {getDietsTypes, postRecipe } from "../actions/index"
import "./styles/CreateRecipe.css"

export default function CreateRecipe(){
  const dispatch = useDispatch()
  const history = useHistory()
  const dietsTypes = useSelector(state => state.diets)

  const [errors, setErrors] = useState({})

  const [input, setInput] = useState({
    name:"",
    summary:"",
    healthScore:0,
    steps:"",
    diets:[]
  })


  useEffect(()=>{
    dispatch(getDietsTypes())
  }, [dispatch])


const validate = (input)=>{
  let errors = {}
  if(!input.name){
    errors.name = 'Please complete with a recipe name'
  } else if (!input.summary){
    errors.summary = 'Please add some comments about your recipe'
  } else if (input.healthScore < 1 || input.healthScore > 100 ){
    errors.healthScore = 'The score must be a number between 1 and 100'
  } else if (!input.steps.length){
    errors.steps = 'Please detail the steps for your recipe'
  }  else if (!input.diets.length){
    errors.diets = 'You must select at least one diet type'
  }
  return errors
}



  const handleChange = (e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }


  const handleCheck = (e)=>{
    if(e.target.checked){
      setInput({
        ...input,
        diets: [...input.diets, e.target.value]
      })
    } else {
      const diets = input.diets.filter(diet =>{
        return diet !== e.target.value
      })
      setInput({
        ...input,
        diets: diets
      })
    }
    console.log(input.diets)
  }

  // const handleCheck = (e)=>{
  //   if(e.target.checked){
  //    const arr = [e.target.value]
  //    return setInput([...arr])
  //   }
  //   let arr2 = diet.filter(el => el !== e.target.value)
  //   setInput(arr2)
  // }

  
    // const handleCheck = (e)=> {
    //   e.preventDefault()
       
    //     let newArray = input.diets;
    //     let find = newArray.indexOf(e.target.value);
        
    //     if (find >= 0) {
    //         newArray.splice(find, 1)
    //     } else {
    //         newArray.push(e.target.value)
    //     }
        
    //     setInput({
    //         ...input,
    //         diets: newArray
    //     });

        
    // }

    const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(postRecipe(input))
    alert("Recipe created")
    setInput({
    name:"",
    summary:"",
    healthScore:0,
    steps:"",
    diets:[]
  })
  history.push("/home")
  }


  return (
    <div>
      <Link to={"/home"}>
        <button>Back</button>
      </Link>
      <h1>Create your recipe!</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}/>
          {errors.name && (
            <p>{errors.name}</p>
          )}
        </div>
        <div>
          <label>Summary: </label>
           <textarea type="text" value={input.summary} name="summary" onChange={(e)=>handleChange(e)}></textarea>
           {errors.summary && (
            <p>{errors.summary}</p>
          )}
        </div>
        <div>
          <label>Health Score: </label>
          <input type="number" value={input.healthScore} name="healthScore" onChange={(e)=>handleChange(e)}/>
          {errors.healthScore && (
            <p>{errors.healthScore}</p>
          )}
        </div>
        <div>
          <label>Steps: </label>
          <textarea type="text" value={input.steps} name="steps" onChange={(e)=>handleChange(e)}></textarea>
           {errors.steps && (
            <p>{errors.steps}</p>
          )}
        </div>
        {/* <div>
          <label>Diet Types: </label>
         {dietsTypes.map(d =>{
                            return (
                                <div key={d.id} className="checks">
                                    <label className="dietTypes">{d.name}</label>
                                    <input className="checks" type="checkbox" name={d.name} value={d.name} selected={dietsTypes?.includes(d.name)} onChange={e => handleCheck(e)}/>
                                </div>
                            )
                        })}
        </div> */}
        {/* <div>
          <label>Diet Types: </label>
         {listDiets.map(d =>{
                            return (
                                <div key={d} className="checks">
                                    <label className="dietTypes">{d}</label>
                                    <input className="checks" type="checkbox" name={d} value={d} selected={input.diets?.includes(d)} onChange={e => handleCheck(e)}/>
                                </div>
                            )
                        })}
        </div> */}
        <div>
          <label >Diets: </label>
         {dietsTypes?.map((d)=>{
          return <label key={d.id}>
            <input type="checkbox" name={d.name} value={d.name} onChange={(e)=>handleCheck(e)}/>
            {d.name}
          </label>
         })}
          {errors.diets && (
            <p>{errors.diets}</p>
          )}
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  )
}