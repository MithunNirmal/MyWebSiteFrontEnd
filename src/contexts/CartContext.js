import React, { createContext, useContext, useEffect, useState } from "react";
import UrlContext from "./UrlContext";
import { UserContext } from "./UserContext";

const CartContext = React.createContext(null);

const CartProvider = ({ children }) => {
        // const localCart = JSON.parse(localStorage.getItem("cart") || []);
        const { url } = useContext(UrlContext);
		const [cart, setCart] = useState([]);
        const { isLoggedOn, userId } = useContext(UserContext);
        let firstRender = true;
        let localCart; 
        useEffect(() => {
            try {
            localCart = JSON.parse(localStorage.getItem("cart") || []);
            }
            catch (error) {
                console.log(error);
            }
        }, [])

        useEffect(() => {
            if(isLoggedOn){
                fetch(`http://192.168.1.100:8080/api/v1/cart?userId=${userId}`, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cart),
                })
                .then((response) => {console.log(response.status)})
                .catch((error) => {console.error(error)});
            }

        }, [isLoggedOn, cart]);

        const addToCart = (item) => {
            if(!cart.find(cartItem => item.productId === cartItem.productId)){
                setCart([...cart, item]);
            }
            else{
                console.log("already iruku da");
                let cartItem = cart.find((cartItem) => { if(item.productId === cartItem.productId) {return cartItem}})
                let index = cart.indexOf(cartItem)
                let newArr = [...cart];
                console.log(cart);
                if(cartItem.productType  !== "DOWNLOADABLE") {
                    if(cartItem.count)
                        cartItem.count++;
                    else
                        cartItem.count = 2;
                }
                else {
                    console.log("can't add a downloadable product more than once");
                }
                newArr[index] = cartItem;
                setCart(newArr);
                //setCart([...cart, cartItem]);
            }
        };
        const removeFromCart = (itemToDelete) => {
            // const updatedCart = [...cart];
            // updatedCart.splice(index, 1);
            // setCart(updatedCart);

            const index = cart.findIndex(cartItem => itemToDelete.productId === cartItem.productId)
            let newArr = [...cart];
            if(index !== -1){
                if(!newArr[index].count || newArr[index].count < 2)
                    newArr.splice(index, 1);
                else newArr[index].count--;
            }
            setCart(newArr);
            localStorage.setItem("cart", newArr);

            // let cartItem = cart.find((cartItem) => { if(itemToDelete.id === cartItem.id) {return cartItem}})
            // const cartStorageFilter = cart.filter((item) => {
            //     return item.id !== itemToDelete.id
            //   })
            //   if(cartItem.count>1){
            //     cartItem.count--;
            //     cartStorageFilter.push(cartItem);
            //   }
            //   setCart(cartStorageFilter);
            //   console.log(cartStorageFilter);
            //   localStorage.setItem("cart", JSON.stringify(cartStorageFilter))
        };

        useEffect(() => {
            if(firstRender) {
                if(localCart){
                    setCart(localCart);
                    firstRender = false;
                }
                else{
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
            }
            else{
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }, [cart]);

		return (
			<CartContext.Provider value={{cart, addToCart, removeFromCart}}>
				{children}
			</CartContext.Provider>
		)
};
  
export { CartContext, CartProvider };

