import React from "react";
import {Link} from "react-router-dom"
import "./styles/LandingPage.css"


function LandingPage (){
    return (
        <div className="LandingPage">
         <h1 className="h1-Landing">Bienvenidos a mi Proyecto Food</h1>
         <Link to="/home" >
            <button className="button-Landing">Home</button>
         </Link>
        </div>
    )
}

export default LandingPage
