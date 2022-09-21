import React from "react";
import {Link} from "react-router-dom"


function LandingPage (){
    return (
        <div>
         <h1>Bienvenidos a mi Proyecto Food</h1>
         <Link to="/home" >
            <button>Home</button>
         </Link>
        </div>
    )
}

export default LandingPage
