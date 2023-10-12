import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import BookModal from "./BookModal"
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { useOutletContext, useLoaderData } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';





function Favorites(props){

    const {fav, setFav} = useOutletContext();
    const {show, setShow} = useOutletContext();
    const {book, setBook} = useOutletContext();
    const {cart, setCart} = useOutletContext();


    function triggerModal(e) {
        setShow(!show);
    }

    function handleBookClick(e) {
        const url = `https://www.googleapis.com/books/v1/volumes/${e.target.name}`;
        axios.get(url).then(response => {
            if (response.status != 200) {
                throw new Error(`${url} returned status ${response.status}`);
            }
            return response.data;
        }).then(data => {
            setBook(data);
            triggerModal()
        });
    }

    return (
        <>
            <div> 
            <ButtonGroup vertical>
                    {fav.length > 0 ? 
                        fav.map(book => <div className ="pt-4" key={book.id}>
                                <Image src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "ingenBild.png"}  thumbnail/>
                                <Button variant="link" className='border' name={book.id} onClick={handleBookClick}>
                                 {book.volumeInfo.title} - {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No Author"}
                                </Button>
                            </div>)                        : 
                     <div className="pt-4">No favorite books found</div>
                    }
            </ButtonGroup>
            <BookModal cart = {cart} setCart = {setCart} fav = {fav} setFav = {setFav} book={book} show={show} triggerModal={triggerModal}/>
            </div>
        </>
    );

    
}
export default Favorites;