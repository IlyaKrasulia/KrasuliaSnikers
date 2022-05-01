import React from "react";
import { AppContext } from "../../App";
import styles from './Drawer.module.scss'


const Drawer = () => {
    const{
        orderId,
        doOrder,
        loadingOrder,
        totalPrice,
        onDeleteItem,
        drawerOpened,
        setDrawerOpened,
        cardItems,
        Info,
        CompletedOrder,} = React.useContext(AppContext)
    return (
        <div className={`${styles.basket} ${drawerOpened ? styles.visibleDrawer : ''}`}>
            <div className='basket__modal'>
              <h2>Корзина
                <img onClick={() => setDrawerOpened(false)} src='/img/close.jpg' alt='close'/>
              </h2>
    
              {
                cardItems.length>0 ? 
                <div>
                <div className='basket__cards'>
                {cardItems.map(it => {
                  return(
                    <div className="BasketCard" key={it.id}>
                        <img className='BasketCard__img' src={it.img} alt="snikers"></img>
                        <div className="BasketCard__info">
                            <p>{it.name}</p>
                            <h4>{it.price} руб.</h4>
                        </div>
                        <img className='BasketCard__close' onClick={() => onDeleteItem(it.id)} src="/img/delete.svg" alt="delete"/>
                    </div>
                )
                     
                })}
                </div> 
                 <div className='basket__modal--top'>
                  <li>
                    <h4>Итого: </h4>
                    <span></span>
                    <h3>{totalPrice} руб.</h3>
                  </li>
                  <li>
                    <h4>Налог 5%: </h4>
                    <span></span>
                    <h3>{totalPrice * 0.95} руб.</h3>
                  </li>
                  <button disabled={loadingOrder} onClick={doOrder}>Оформить заказ <img src="/img/arrow.svg" alt='arrow'/></button>
                </div>
                </div> : 
                <Info 
                title={CompletedOrder ? "Заказ оформлен!" : "Корзина пустая"}
                imagesUrl={CompletedOrder ? "/img/completed-order.png" : "/img/empty.png"}
                description={CompletedOrder ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." }
                closeModal={() => setDrawerOpened(false)}
                />
                }
            </div>
          </div>
    )
}

export default Drawer;