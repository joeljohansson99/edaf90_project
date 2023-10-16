import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect} from 'react';
import { Outlet } from "react-router-dom"
import Header from './Header';
import Footer from './Footer';
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);
  const [fav, setFav] = useState([]);
  const [show, setShow] = useState(false);
  const [book, setBook] = useState({volumeInfo:"test"});
  const navigate = useNavigate();
  const myStyle={
    backgroundImage: 
    "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
    height:'100vh',
    marginTop:'-70px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

  useEffect(() => {
    const favorites = JSON.parse(window.localStorage.getItem("Favorites"))
    if(favorites !== null){
      setFav(favorites)
    };
  }, []);

  useEffect(() => {
    const currentCart = JSON.parse(window.localStorage.getItem("Cart"))
    if(currentCart !== null){
      setCart(currentCart);
    };
  }, []);        

  return (
    <div className="container py-4 bg-light rounded">
    {
        <>
            <Header />

            <NavBar />
            
            <Outlet context={{cart, setCart, book, setBook, show, setShow, fav, setFav, navigate}} />

            <Footer />
        </>
    }
    </div>
);
}

export default App;
