import React from "react";

export default function Recipe ({image, name, diets}){
    return (
        <div>
             <img src={image} alt="Receta" />
             <h1>{name}</h1>
             <div>
               {diets?.map((d, i) => (
                 <div key={i}>
                   <p>{d}</p>
                 </div>
                ))}
            </div>
        </div>
    )

// let prevId = 1;

//     export default function Recipe (recipes){
      
//       const {image, name, diets} = recipes
//       return (
//         <div>
//              <img src={image} alt="Receta" />
//              <h1>{name}</h1>
//              <div className="dietcointainer">
//                 {diets?.map(e => {
//                     return (
//                         <h5 className="diets" key={prevId++}>{typeof(e)}</h5>
//                     )
//                 })}            
//             </div>
//         </div>
//     )

//  export default function Recipe (recipes){
      
//       const {image, name, diets} = recipes
//       return (
//         <div>
//              <img src={image} alt="Receta" />
//              <h1>{name}</h1>
//              <h5>{diets.map((d)=>{
//               return typeof(d)
//              })}</h5>    

//         </div>
//     )
}