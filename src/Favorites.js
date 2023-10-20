import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import BookModal from "./BookModal"
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import Toast from './Toast';



function Favorites() {

    const { fav, favDispatch } = useOutletContext();
    const { cart, cartDispatch } = useOutletContext();

    const [showConfirm, setShowConfirm] = useState(false);
    const [book, setBook] = useState({});
    const [show, setShow] = useState(false);

    function triggerModal(e) {
        setShow(!show);
    }

    function handleBookClick(e) {
        const url = `https://www.googleapis.com/books/v1/volumes/${e.target.name}`;
        axios.get(url).then(response => {
            if (response.status !== 200) {
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
            {showConfirm && <Toast setShowConfirm={setShowConfirm} showConfirm={showConfirm} body={`<p> ${book.volumeInfo.title} was added to shopping cart! </p>`} />}
            <ButtonGroup vertical>
                {fav.length > 0 ?
                    fav.map(book => <div className="pt-4" key={book.id}>
                        <Image src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "ingenBild.png"} thumbnail />
                        <Button variant="link" className='border' name={book.id} onClick={handleBookClick}>
                            {book.volumeInfo.title} - {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No Author"}
                        </Button>
                    </div>) :
                    <div className="pt-4">No favorite books found</div>
                }
            </ButtonGroup>
            {show && <BookModal showConfirm={showConfirm} setShowConfirm={setShowConfirm} cart={cart} cartDispatch={cartDispatch} fav={fav} favDispatch={favDispatch} book={book} show={show} triggerModal={triggerModal} />}
        </>
    );


}
export default Favorites;