import React from "react";

export default function Recipe ({image, name, diets}){
    return (
        <div>
             <img src={image} alt="Receta" />
             <h1>{name}</h1>
             <div>
               {diets?.map((d, i) => (
                 <div key={i}>
                   <p >{d}</p>
                 </div>
                ))}
            </div>
        </div>
    )
}