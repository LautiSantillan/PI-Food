import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getRecipes, getDietsTypes, filterDietType, orderAlphabetical, orderByHealthScore } from "../actions/index";
import { Link } from "react-router-dom";
import Recipe from "../components/Recipe"
import Paginado from "./Paginado";
import styles from "./styles/Home.module.css"
import SearchBar from "./SearchBar";
import img from "../images/recipe-tittle.png"
import { NotFound } from "./NotFound";
import { Loading } from "./Loading";


export default function Home() {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state) => state.recipes)
  // const loading = useSelector(state => state.loading)
  const [loading, setLoading] = useState(true)
  const [orden, setOrden] = useState("");

  //PAGINADO------------------------------------------------------------------

  const [actualPage, setActualPage] = useState(1)
  const [recipesPerPage, setRecipesPerPage] = useState(9)

  const indexOfLastRecipe = actualPage * recipesPerPage //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //0

  const actualRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe)

  const paginado = (pageNumber) => {
    setActualPage(pageNumber)
  }

  if (allRecipes?.length > 0 && loading) {
    setLoading(false)
  }

  //-------------------------------------------------------------------------------------


  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getDietsTypes())
  }, [dispatch])

  const handleClick = (e) => {
    if (!loading && actualRecipes?.length > 0) {
      e.preventDefault()
      setLoading(true)
      dispatch(getRecipes())
    }
  }

  const handleFilterDietType = (e) => {
    e.preventDefault()
    dispatch(filterDietType(e.target.value))
    // setActualPage(1)
  }

  const handleOrderAlphabetical = (e) => {
    e.preventDefault()
    dispatch(orderAlphabetical(e.target.value))
    // setActualPage(1);
    // setOrden(`Ordenado ${e.target.value}`)
  }

  const handleHealthScore = (e) => {
    e.preventDefault()
    dispatch(orderByHealthScore(e.target.value))
    // setActualPage(1);
    // setOrden(`Ordenado ${e.target.value}`)
  }


  return (
    <div id={styles.Home}>
      <div id={styles.div_h1}>
        <h1 id={styles.h1}>Recipes</h1>
        <img id={styles.img} src={img} alt="Recipe" width="50px" height="50px" />
      </div>
      <Link to={"/recipes"}><button id={styles.buttonCreate}>Create Recipe</button></Link>
      <button id={styles.buttonClear} onClick={handleClick}>Clear Filters</button>
      <SearchBar setActualPage={setActualPage} setLoading={setLoading} />
      <div>
        <div id={styles.div_Select}>
          <select id={styles.select_Home} name="alphabetical" onChange={(e) => handleOrderAlphabetical(e)}>
            <option disabled selected>Alphabetical Order...</option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
          </select>
          <select id={styles.select_Home} name="numerical" onChange={(e) => handleHealthScore(e)}>
            <option disabled selected>Health Score Order...</option>
            <option value="asc">From Min to Max</option>
            <option value="desc">From Max to Min</option>
          </select>
          <select id={styles.select_Home} name="diets" onChange={(e) => handleFilterDietType(e)}>
            <option disabled selected>Select Diet...</option>
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
        </div>

        <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes?.length} paginado={paginado} actualPage={actualPage} />

        {/* <div id={styles.divCard}>
          {!loading && actualRecipes?.length > 0 ? (
            actualRecipes?.map((recipe) => {
              return (
                <Recipe id={recipe.id} name={recipe.name} image={recipe.image} diets={recipe.diets} key={recipe.id} />
              );
            })
          ) : loading && !actualRecipes?.length > 0 ? (
            <Loading />
          ) : (
            <NotFound />
          )}
        </div> */}

        <div id={styles.divCard}>
          {loading ? (<Loading />) : actualRecipes?.length ?
            actualRecipes?.map(recipe =>
              <Recipe id={recipe.id} name={recipe.name} image={recipe.image} diets={recipe.diets} key={recipe.id} />) : <NotFound />}
        </div>
      </div>
    </div>
  )
}