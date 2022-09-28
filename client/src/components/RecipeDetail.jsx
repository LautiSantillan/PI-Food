import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { getRecipeDetail } from "../actions";
import { useEffect } from "react";
import styles from "./styles/RecipeDetail.module.css"

export default function RecipeDetail (props){
    const recipeId = props.match.params.id
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getRecipeDetail(recipeId))
    }, [dispatch, recipeId])

    const recipeDetail = useSelector(state => state.recipeDetail)

    return (
        <div id={styles.recipeDetail}>
            {
                recipeDetail.length < 1 ? (
                      <div id={styles.loading}>
                        <span id={styles.dot}></span>
                        <span id={styles.dot}></span>
                        <span id={styles.dot}></span>
                      </div>
                    ) :
                <div id={styles.detailCard}>
                    <img src={recipeDetail.image} alt="Recipe Detail" />
                    <h2>Name: {recipeDetail.name}</h2>
                    <h4>Summary: {recipeDetail.summary?.replace(/<[^>]*>?/g, "")}</h4>
                    <h4>HealthScore: {recipeDetail.healthScore}</h4>
                    <h4>Steps: {recipeDetail.steps}</h4>
                    <h4 id={styles.title}>Diets: {recipeDetail.diets?.map((d, i)=>{
                        return <span id={styles.span} key={i}>{d}</span>
                    })}</h4>
                </div>
            } 
            <Link to={"/home"}>
                <button id={styles.button}>Back</button>
            </Link>
        </div>
    )
}