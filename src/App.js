import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Info from './components/Info/Info';
import Favourite from './pages/Favourite';
import Drawer from './components/Drawer';
import './app.scss';
import './drawer-card.scss'
import logo from './assets/images/logo.svg';
import bag from './assets/images/bag.svg';
import heart from './assets/images/heart.svg';
import profile from './assets/images/profile.svg';
import Home from './pages/Home';
import Orders from './pages/Orders';

export const AppContext = React.createContext({});

const delay = (ms) => new Promise((resolve => setTimeout(resolve, ms)));

function App() {
  const[drawerOpened, setDrawerOpened] = useState(false);
  const[CompletedOrder, setCompletedOrder] = useState(false);
  const[isLoading, setIsLoading] = useState(true);
  const[loadingOrder, setLoadingOrder] = useState(false)
  const[sniks, setSniks] = useState([]);
  const[cardItems, setCardItems] = useState([]);
  const[favorite, setFavorite] = useState([]);
  const[searchValue, setSearchValue] = useState('');
  const[orderId, setOrderId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoriteResponse, sniksResponse] = await Promise.all([
          axios.get('https://624e90a053326d0cfe5c5729.mockapi.io/cart'),
          axios.get('https://624e90a053326d0cfe5c5729.mockapi.io/favourite'),
          axios.get('https://624e90a053326d0cfe5c5729.mockapi.io/items'),
        ]);
        setIsLoading(false);
        setCardItems(cartResponse.data);
        setFavorite(favoriteResponse.data);
        setSniks(sniksResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
      }
      
    }
    fetchData()
  }, []);

  const doOrder = async () => {
    try {
      setLoadingOrder(true);
      setCompletedOrder(true);
      setCardItems([]);
      const {data} = await axios.post('https://624e90a053326d0cfe5c5729.mockapi.io/orders', {
        items: cardItems
      });
      setOrderId(data.id);
      for(let i = 0; i < cardItems.length; i++) {
        const item =cardItems[i];
        await axios.delete(`https://624e90a053326d0cfe5c5729.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      alert('Произошла ошибра при обработке заказа :(');
    }
    setLoadingOrder(false);
  }

  const setSearchInput = (e) => {
    setSearchValue(e.target.value);
  }
  

  const openModal = () => {
    setDrawerOpened(true);
  }
  document.addEventListener('keydown', function(e){
    if(e.code === "Escape"){
      setDrawerOpened(false);
    }
  })



  const onAddCard = async (obj) => { 
    const findItems = cardItems.find(it => Number(it.parentId)=== Number(obj.id))
    try {
      if(findItems){
      setCardItems(prev => prev.filter(it => +it.parentId !== +obj.id));
      await axios.delete(`https://624e90a053326d0cfe5c5729.mockapi.io/cart/${findItems.id}`);
    } else {
      const {data} = await axios.post('https://624e90a053326d0cfe5c5729.mockapi.io/cart', obj);
      setCardItems([...cardItems, data]);
    }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
    
    
  }

  const onDeleteItem = (id) => {
    try {
      setCardItems((prev) => prev.filter(it => +it.id !== + id));
      axios.delete(`https://624e90a053326d0cfe5c5729.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Ошибка при удалении из корзины');
    }
    
  }

  const onAddToFavourite = async (obj) => {
    try {
       if(favorite.find(it => +it.id===+obj.id)){ 
      axios.delete(`https://624e90a053326d0cfe5c5729.mockapi.io/favourite/${obj.id}`);
      setFavorite(prev => prev.filter(it => +it.id !== +obj.id));
    } else {
      const {data} = await axios.post('https://624e90a053326d0cfe5c5729.mockapi.io/favourite', obj);
      setFavorite([...favorite, data])
    }
    } catch (error) {
      alert('Не удалось добавить товар')
    }
  }
  const deleteFavourite = (id) => {
    axios.delete(`https://624e90a053326d0cfe5c5729.mockapi.io/favourite/${id}`)
  }

  const clearInputValue = () => {
    setSearchValue('')
  }

  const isItemAdded = (id) => {
    return cardItems.some(obj => +obj.parentId === +id);
  };

  const totalPrice = cardItems.reduce((sum, obj) => obj.price + sum, 0)

  return (
    <AppContext.Provider 
    value={{ 
      sniks, 
      favorite, 
      isItemAdded, 
      onAddToFavourite, 
      deleteFavourite, 
      isLoading, 
      onAddCard,
      setDrawerOpened,
      drawerOpened,
      orderId,
      doOrder,
      loadingOrder,
      totalPrice,
      onDeleteItem,
      cardItems,
      Info,
      CompletedOrder,
       }}>
      <div className="App">
      <header>
        <div className='container'>
        <div className="header">
        <Link to={'/'}>
            <div className="header__left">
                <img src={logo} alt="logo"/>
              <li>
                <h3>BigShoes</h3>
                <p>Магазин лучших кроссовок</p>
              </li>
            </div>
            </Link>
            <div className="header__right">
              <li onClick={openModal}>
                <img src={bag} alt="Bag"/>
                <p>{totalPrice} руб.</p>
              </li>
              <Link to={'/favourite'}><img src={heart} alt="favorite"/></Link>
              <Link to={'/profile'}><img src={profile} alt="profile"/></Link>
            </div>
          </div>
        </div>
        <div className='header__line'></div>
      </header>
      <div className='container'>
        <Routes>
            <Route path='/' element={
            <Home
            searchValue={searchValue}
            setSearchInput={setSearchInput}
            clearInputValue={clearInputValue}
            sniks={sniks}
            onAddCard={onAddCard}
            deleteFavourite={deleteFavourite}
            onAddToFavourite={onAddToFavourite}
            cardItems={cardItems}
            isLoading={isLoading}
          />
          }/>
          <Route 
          path='/favourite' 
          element={<Favourite 
            
            onAddToFavourite={onAddToFavourite}/>
            } 
          />
          <Route 
          path='/profile' 
          element={<Orders />} 
          />
        </Routes>
        
      
      </div>
      <div>

      </div>
      <div>
        <Drawer />
      </div>
</div>
    </AppContext.Provider>
  );
}

export default App;
