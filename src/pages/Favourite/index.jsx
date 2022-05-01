import React from "react"
import { Link } from "react-router-dom";
import ShoesCard from "../../components/ShoesCard";
import './style.scss'
import { AppContext } from "../../App";


function Favourite({ onAddToFavourite }){
const { favorite } = React.useContext(AppContext)


return(
    <React.Fragment>
        <div className="favourite__top">
            <Link to="/">
            <img src="/img/back-btn.svg" alt="Go back" />
            </Link>
            <h1>Мои закладки</h1>
        </div>
        <div className="favourite__cards">
{
    favorite.map((it) => {
        return(
            <ShoesCard 
            favorited
            onAddToFavourite={onAddToFavourite}
            key={it.id}
            {...it}
            />
        )
    })
}
        </div>
    </React.Fragment>
)
    
}

export default Favourite