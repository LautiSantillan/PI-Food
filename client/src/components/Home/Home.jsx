import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getRecipes, getDietsTypes, filterDietType, orderAlphabetical, orderByHealthScore, /* setPage */ } from "../../actions/index";
import Recipe from "../Recipe/Recipe"
import Paginado from "../Paginado/Paginado";
import styles from "../Home/Home.module.css"
import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";


export default function Home() {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state) => state.recipes)
  const loading = useSelector(state => state.loading)
  // const [orden, setOrden] = useState("");

  //PAGINADO------------------------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1)
  // const currentPage = useSelector(state => state?.currentPage)


  // eslint-disable-next-line
  const [recipesPerPage, setRecipesPerPage] = useState(9)

  const indexOfLastRecipe = currentPage * recipesPerPage //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //0

  const actualRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe)

  const paginado = (number) => {
    // dispatch(setPage(number))
    setCurrentPage(number)
  }


  // useEffect(() => {
  //   if (allVideogames.length === 0) {
  //     dispatch(getVideogames());
  //   }
  // }, [dispatch, allVideogames]);

  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getDietsTypes())
    // dispatch(setPage(1))
  }, [dispatch])

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getRecipes())
  }

  const handleFilterDietType = (e) => {
    e.preventDefault()
    dispatch(filterDietType(e.target.value))
    // dispatch(setPage(1))
    paginado(1)
  }

  const handleOrderAlphabetical = (e) => {
    e.preventDefault()
    dispatch(orderAlphabetical(e.target.value))
    // dispatch(setPage(1))
    paginado(1)
    // setOrden(`Ordenado ${e.target.value}`)
  }

  const handleHealthScore = (e) => {
    e.preventDefault()
    dispatch(orderByHealthScore(e.target.value))
    // dispatch(setPage(1))
    paginado(1)
    // setOrden(`Ordenado ${e.target.value}`)
  }


  return (
    <div id={styles.Home}>
      <NavBar paginado={paginado}></NavBar>
      <div>
        <div id={styles.div_Select}>
          <select id={styles.select_Home} name="alphabetical" onChange={(e) => handleOrderAlphabetical(e)} defaultValue="default">
            <option value="default" disabled>Alphabetical Order...</option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
          </select>
          <select id={styles.select_Home} name="numerical" onChange={(e) => handleHealthScore(e)} defaultValue="default">
            <option value="default" disabled>Health Score Order...</option>
            <option value="asc">From Min to Max</option>
            <option value="desc">From Max to Min</option>
          </select>
          <select id={styles.select_Home} name="diets" onChange={(e) => handleFilterDietType(e)} defaultValue="default">
            <option value="default" disabled>Select Diet...</option>
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
          <button id={styles.buttonClear} onClick={handleClick}>Reload</button>
        </div>

        <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes?.length} currentPage={currentPage} /* setActualPage={setActualPage} */ paginado={paginado} />

        <div>
          <div id={styles.divCard}>
            {loading ? <Loading /> : actualRecipes?.length > 0 ?

              actualRecipes.map(recipe =>
                <Recipe id={recipe.id} name={recipe.name} image={recipe.image} diets={recipe.diets} created={recipe.created} key={recipe.id} />)

              : <NotFound />}
            {/* <Loading /> */}
          </div>
        </div>

      </div>
    </div>
  )
}