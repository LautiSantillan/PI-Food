import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getRecipes, filterDietType, orderAlphabetical, orderByHealthScore} from "../actions/index";
import { Link } from "react-router-dom";
import Recipe from "../components/Recipe"
import Paginado from "./Paginado";
import "./styles/Home.css"
import SearchBar from "./SearchBar";


export default function Home (){
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)

     const [order, setOrder] = useState('')

    //PAGINADO------------------------------------------------------------------

    const [actualPage, setActualPage] =useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    
    const indexOfLastRecipe = actualPage * recipesPerPage //9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //0

    const actualRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber)=>{
      setActualPage(pageNumber)
    }

    //-------------------------------------------------------------------------------------


    useEffect(()=>{
        dispatch(getRecipes())
    }, [dispatch])
    
    const handleClick = (e) =>{
    e.preventDefault()
    dispatch(getRecipes())
    setActualPage(1)
    }

    const handleFilterDietType = (e)=>{
       e.preventDefault()
      dispatch(filterDietType(e.target.value))
      setActualPage(1)
    }

    const handleOrderAlphabetical = (e)=>{
      e.preventDefault()
      dispatch(orderAlphabetical(e.target.value))
      setActualPage(1)
      setOrder(`Order ${e.target.value}`);
    }

    const handleHealthScore = (e)=>{
       e.preventDefault()
      dispatch(orderByHealthScore(e.target.value))
      setActualPage(1)
      setOrder(`Order ${e.target.value}`);
    }

    return (
        <div className="Home">
            <Link to={"/recipes"}>Crear receta</Link>
            <h1>Recipes List</h1>
            <button onClick={handleClick}>Clear Filters</button>
            <SearchBar/>
            <div>
              <select className="select-Home" onChange={(e)=>handleOrderAlphabetical(e)}>
                <option disabled selected>Alphabetical</option>
                <option value="atoz">A to Z</option>
                <option value="ztoa">Z to A</option>
              </select>
              <select className="select-Home" onChange={(e)=>handleHealthScore(e)}>
                <option disabled selected>Health Score</option>
                <option value="asc">From Min to Max</option>
                <option value="desc">From Max to Min</option>
               </select>
               <select className="select-Home" onChange={(e)=>handleFilterDietType(e)}>
                 <option disabled selected>Select...</option>
                 <option value="gluten free">Gluten Free</option>
                 <option value="ketogenic">Ketogenic</option>
                 <option value="vegetarian">Vegetarian</option>
                 <option value="lacto vegetarian">Lacto-Vegetarian</option>
                 <option value="ovo vegetarian">Ovo-Vegetarian</option>
                 <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                 <option value="vegan">Vegan</option>
                 <option value="pescatarian">Pescatarian</option>
                 <option value="paleolithic">Paleolithic</option>
                 <option value="primal">Primal</option>
                 <option value="fodmap friendly">Foodmap friendly</option>
                 <option value="whole 30">Whole30</option>
                 <option value="dairy free">Dairy Free</option>
                </select>
                <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}/>
                {
                  actualRecipes?.map((recipe) => {
                    return <Recipe name={recipe.name} image={recipe.image} diets={recipe.diets} key={recipe.id}/>
                  })
                }
            </div>
        </div>
    )
}