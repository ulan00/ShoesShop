import axios from 'axios';
import {API} from "../Helpers/Constants"
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { calcSubPrice, calcTotalPrice} from "../Helpers/CalcPrice"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Firebase';

export const productContext = createContext()

const INIT_STATE = {
    products: null,            
    edit: null,
    cart: {},
    cartLength: 0,
    paginatedPages: 1,
    detail: {}
}

const reducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case "GET_PRODUCTS":
            return {...state, products: action.payload.data, 
                paginatedPages: Math.ceil(action.payload.headers["x-total-count"] / 3)
            }    
        case "GET_EDIT_PRODUCT":
            return {...state, edit: action.payload} 
        case "CHANGE_CART_COUNT": 
            return {...state, cartLength: action.payload}
        case "GET_CART":
            return {...state, cart: action.payload}
        case "GET_DETAIL_PRODUCT":
            return {...state, detail: action.payload}
        default: 
            return state
    }
}

const ProductsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    
    //! Create
    const addProduct = async (newProduct) => {
        try {
            await axios.post(API, newProduct)
            getProducts()
        } catch (error) {
            alert(error);
        }
    }
    
    //! Read
    const getProducts = async () => {
        try {
            let res = await axios.get(`${API}${window.location.search}`)
            let action = {
                type: "GET_PRODUCTS",
                payload: res
            }
            dispatch(action)    
        } catch (error) {
            alert(error)
        }
    }
    
    //! Delete
    const deleteProduct = async (id) => {
        await axios.delete(`${API}/${id}`)
        getProducts()
    }
    
    //! Update product
    const editProduct = async (id) => {
        try {
            let res = await axios(`${API}/${id}`)
            let action = {
                type: "GET_EDIT_PRODUCT",
                payload: res.data
            }
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
    
    //! Save edited product
    const saveEditedProduct = async (updatedProduct) => {
        try {
            await axios.patch(`${API}/${updatedProduct.id}`, updatedProduct)
            getProducts()
        } catch (error) {
            console.log(error);
        }
    }
    
    //! CART  --- Add to cart function
    // добавляет в локалсторидж для корзины
    
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'))  //
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }
        
        let filteredCart = checkProductInCart(product.id)
        if(filteredCart === true) {
            cart.products = cart.products.filter(elem => elem.item.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }
        
        newProduct.subPrice = calcSubPrice(newProduct)
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
        
        // console.log(cart)
        
        // localStorage.setItem('cart', JSON.stringify(cart))
    }
    
    //!
    // Считает количество товаров в корзине
    
    const getCartLength = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))  
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }
    
    
    //!
    // для стягивания и отображения данных с корзины (с локалсторидж)
    
    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))  //
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }
    
    const changeProductCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))  //
        cart.products = cart.products.map(elem => {
            if (elem.item.id === id) {
                elem.count = count >= 0 ? count: 0;
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        getCart()
    }
    
    //! Check product in cart
    
    const checkProductInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length > 0 ? true : false    
    }
    
    //! Get DETAIL
    
    const getDetail = async (id) => {
        const res = await axios(`${API}/${id}`)
        let action = {
            type: "GET_DETAIL_PRODUCT",
            payload: res.data
        }
        dispatch(action)
    }
        
    // ! SIGN UP / SIGN IN
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    function logout () {
        return signOut(auth)
    }
    
    function useAuth() {
        const [currentUser, setCurrentUser] = useState()
        
        useEffect(() => {
            const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
            return unsub
        }, [])
        
        return currentUser
    }

    //! Favorite
    const addToStar = (product) => {
        let star = JSON.parse(localStorage.getItem('star'));
        if(!star) {
            star = {
                products: [],
            }
        }
        let newProduct = {
            item: product,
            count: 1,
        }
        let filteredStar = chekProductInStar(product.id)
        if(filteredStar === true) {
            star.products = star.products.filter(elem => elem.item.id !== product.id )
        }
        else{
            star.products.push(newProduct)
        }
        // newProduct.subPrice = calcSubPrice(newProduct)
        // cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('star', JSON.stringify(star))
        dispatch({
            type: 'CHANGE_STAR_COUNT',
            payload: star.products.length
        })
    }
      const getStarLength = () => {
        let star = JSON.parse(localStorage.getItem('star'));
        if(!star) {
            star = {
                products: [],
                
                
            }
        }
        dispatch({
            type: 'CHANGE_STAR_COUNT',
            payload: star.products.length 
        })
    }
   
    // !для стягивания и отображения данных с корзины
        const getStar = () => {
            let star = JSON.parse(localStorage.getItem('star'));
        if(!star) {
            star = {
                products: [],
                
            }
        }
        dispatch({
            type: 'GET_STAR',
            payload: star
        })
        }
        const chekProductInStar = (id) => {
            let star = JSON.parse(localStorage.getItem('star'))
            if(!star) {
                star= {
                    products: [],
                }
            }
            let newStar = star.products.filter(elem => elem.item.id === id)
            // console.log(newCart);
            return newStar.length = 0 ? true : false
        }
               // ! DELETEPRODUCTINstar
               const deleteProductInStar = (id) => {
                let toDelete = JSON.parse(localStorage.getItem('star'));
                toDelete.products =toDelete.products.filter(
                    (elem) => elem.item.id !== id
                );
                localStorage.setItem('star', JSON.stringify(toDelete))
                getStar()
                dispatch({
                    type: "CHANGE_STAR_COUNT",
                    payload: toDelete.products.length
                })
            }
    
    return (
        <productContext.Provider value={{
            addProduct,
            getProducts,
            deleteProduct,
            editProduct,
            saveEditedProduct,
            addToCart,
            checkProductInCart,
            getCartLength,
            getCart,
            changeProductCount,
            getDetail,
            signUp,
            signIn,
            logout,
            useAuth,
            edit: state.edit,
            products: state.products,
            cartLength: state.cartLength,
            cart: state.cart,
            paginatedPages: state.paginatedPages,
            detail: state.detail
        }}>
            {children}
        </productContext.Provider>
    );
};

export default ProductsContextProvider;