import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ShoesCard from "../../components/ShoesCard";
import { AppContext } from "../../App";
import './style.scss'


function Orders(){
    const[orders, setOrders] = React.useState([]);

    const { deleteFavourite, isLoading } = React.useContext(AppContext)
    
    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://624e90a053326d0cfe5c5729.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
            } catch (error) {
                alert('Не удалось загрузить список купленных товаров :(')
            }
        })();
    }, [])


    return(
    <React.Fragment>
        <div className="favourite__top">
            <Link to="/">
            <img src="/img/back-btn.svg" alt="Go back" />
            </Link>
            <h1>Мои заказы</h1>
        </div>
        <div className="favourite__cards">
{
    (isLoading ? [...Array(8)] : orders).map((it, index) => {
        return(
            <ShoesCard 
                key={index}
                deleteFavourite={(id)=>deleteFavourite(id)}
                added={false}
                loading={isLoading}
                {...it}
            />
        )
    })
}
        </div>
    </React.Fragment>
)
    
}

export default Orders