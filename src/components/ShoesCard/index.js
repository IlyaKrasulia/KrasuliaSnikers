import React,{useState} from 'react';
import ContentLoader from "react-content-loader";
import { AppContext } from '../../App';
import './shoes-card.scss';


function ShoesCard({id, name, price, img, onPlus, onAddToFavourite, favorited = false, loading = false}) {

    const { isItemAdded } = React.useContext(AppContext);
    const[like, setLiked] = useState(favorited);
    const obj = {id, parentId: id, name, price, img};

    const addToBasket = () => {
        onPlus(obj);
    }
    const setFavoeite = () => {
        setLiked(!like)
        onAddToFavourite(obj);
    }
    return(
        <div className='card'>
        {loading ? (
            <ContentLoader 
            speed={3}
            width={150}
            height={200}
            viewBox="0 0 150 200"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
            <rect x="-1" y="112" rx="3" ry="3" width="150" height="15" /> 
            <rect x="0" y="134" rx="3" ry="3" width="90" height="15" /> 
            <rect x="0" y="171" rx="3" ry="3" width="80" height="25" /> 
            <rect x="115" y="168" rx="3" ry="3" width="32" height="32" />
          </ContentLoader>
        ) : (
            <>
          
        {onAddToFavourite && <img className='card__like' onClick={setFavoeite} src={like ? "/img/liked.svg" : "/img/unliked.svg"} alt='like'/>}
        <img className='card__img' src={img} alt="shoes"/>
        <h4>{name}</h4>
        <p>Цена:</p>
        <h3>{price} руб.
            {onPlus && <img onClick={addToBasket} src={isItemAdded(id) ? "/img/checked.svg" : "/img/plus.svg"} alt="Add to bag"/>}
        </h3>
          </>
          )}
        </div>
    
    ) 
}

export default ShoesCard