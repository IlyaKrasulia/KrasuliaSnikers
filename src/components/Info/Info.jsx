import React from "react";
import './empty-cart.scss'

const Info = ({ title, imagesUrl, description, closeModal }) => {
    return(
        <div className='entry__cart'>
            <img src={imagesUrl} alt="Info"/>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={closeModal}>Вернуться назад</button>
        </div>
    )
}

export default Info