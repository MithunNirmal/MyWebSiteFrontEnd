import React, { createContext, useContext, useEffect, useState } from "react";
import { UrlContext } from "./UrlContext";
import { UserContext } from "./UserContext";

const CartContext = React.createContext(null);

const CartProvider = ({ children }) => {
        // const localCart = JSON.parse(localStorage.getItem("cart") || []);
        const { server } = useContext(UrlContext);
        const serv = "http://172.20.10.2:8080";
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
                fetch(`${serv}/api/v1/cart/add?userId=${userId}`, { //`http://192.168.1.100:8080 
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

        }, [cart]);

        const handleCartLogin = (user_id) => {
            console.log("handleCartLogin Called");
        //    if(cart && cart != [] && isLoggedOn){

                console.log("handleCartLogin Ulla vandhuchaaa");
                fetch(`${serv}/api/v1/cart/sync?userId=${user_id}`, { //`http://192.168.1.100:8080 
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cart),
                })
                .then((response) => {
                    console.log(response.status)
                    if(response.status == 200) {
                        return response.stringify();   
                    }
                })
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("cart", data);
                })
                .catch((error) => {console.error(error)});

        //    }
        }

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
            <UrlContext.Provider value={{server}}>
                <CartContext.Provider value={{cart, addToCart, removeFromCart, handleCartLogin}}>
                    {children}
                </CartContext.Provider>
            </UrlContext.Provider>
		)
};
  
export { CartContext, CartProvider };

