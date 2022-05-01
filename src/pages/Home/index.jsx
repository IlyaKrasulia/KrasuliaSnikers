import React from "react";
import ShoesCard from "../../components/ShoesCard";
import searchSvg from '../../assets/images/search.svg'


function Home({ searchValue, setSearchInput, clearInputValue, sniks, onAddCard, onAddToFavourite, deleteFavourite, isLoading }) {

  const renderItems = () => {
      const filtred = sniks.filter((it) => it.name.toLowerCase().includes(searchValue.toLowerCase()));
      return(isLoading ? [...Array(8)] : filtred).map((it, index) => (
        <ShoesCard
        {...it}
        key={index}
        onPlus={(obj)=>onAddCard(obj)}
        onAddToFavourite={(obj)=>onAddToFavourite(obj)}
        deleteFavourite={(id)=>deleteFavourite(id)}
        added={false}
        loading={isLoading}
      /> 
    
))
  }
    
    return(
        <React.Fragment>
            <div className='all-shoes'>
          <div className='all-shoes__top'>
            <h1>{searchValue ? `Поиск по: "${searchValue}"` : 'Все кросовки'}</h1>
            <div className='search'>
            <img src={searchSvg} alt='Search'/>
            <input onChange={setSearchInput} value={searchValue} placeholder='Поиск...'/>
            {searchValue ? <img onClick={clearInputValue} src='/img/close.jpg' alt='clear'/> : null}
            </div>
          </div>
          <div className='all-shoes__cards'>
            {
             renderItems()
            }
          </div>
        </div>
        </React.Fragment>
    )
    
}

export default Home