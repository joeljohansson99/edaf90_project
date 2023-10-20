import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useReducer } from 'react';
import { Outlet } from "react-router-dom"
import Header from './Header';
import Footer from './Footer';
import NavBar from './Navbar';

function App() {
    function cartReducer(cart, action) {
        switch (action.type) {
            case 'add-book':
                if (!cart.map(b => b.id).includes(action.book.id)) {
                    const newCart = [...cart, { ...action.book, quantity: parseInt(1) }];
                    window.localStorage.setItem("Cart", JSON.stringify(newCart))
                    return newCart
                } else {
                    const q = action.book.quantity
                    const newCart = [...cart.filter(b => b.id !== action.book.id), { ...action.book, quantity: parseInt(q + 1) }]
                    window.localStorage.setItem("Cart", JSON.stringify(newCart))
                    return newCart
                }
            case 'remove-book': {
                console.log("REMOVING")
                const newCart = [...cart.filter(b => b.id !== action.book.id)]
                window.localStorage.setItem("Cart", JSON.stringify(newCart))
                return newCart
            }
            case 'clear-cart': {
                window.localStorage.removeItem("Cart");
                return []
            }
            case 'change-quantity': {
                let element = document.getElementById(action.book.id);
                const newCart = [...cart.map(b => b.id === action.book.id ? { ...action.book, quantity: parseInt(element.value) } : b)]
                window.localStorage.setItem("Cart", JSON.stringify(newCart))
                return newCart
            }
            default:
                return []
        }
    }

    function favReducer(fav, action) {
        switch (action.type) {
            case 'add-fav': {
                const newFav = [...fav, action.book]
                window.localStorage.setItem("Favorites", JSON.stringify(newFav))
                return newFav
            }
            case 'remove-fav': {
                const newFav = fav.filter(b => b.id !== action.book.id)
                window.localStorage.setItem("Favorites", JSON.stringify(newFav))
                return newFav
            }
            default:
                return []
        }
    }


    const [cart, cartDispatch] = useReducer(cartReducer, (JSON.parse(window.localStorage.getItem("Cart")) ? JSON.parse(window.localStorage.getItem("Cart")) : []));
    const [fav, favDispatch] = useReducer(favReducer, (JSON.parse(window.localStorage.getItem("Favorites")) ? JSON.parse(window.localStorage.getItem("Favorites")) : []));

    return (
        <div className="container py-4 bg-light rounded">
            {
                <>
                    <Header />

                    <NavBar />

                    <Outlet context={{ cart, cartDispatch, fav, favDispatch }} />

                    <Footer />
                </>
            }
        </div>
    );
}

export default App;
