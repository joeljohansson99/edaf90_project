import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import BookModal from "./BookModal"
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { useOutletContext, useLoaderData } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';


function SearchForm() {
    const MAX_BOOKS = 10;
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");

    const [books, setBooks] = useState([])
    const [totalBooks, setTotalBooks] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const {cart, setCart} = useOutletContext();
    const {fav, setFav} = useOutletContext();
    const {show, setShow} = useOutletContext();
    const {book, setBook} = useOutletContext();

    function onTitleChange(e) {
        setTitle(e.target.value)
    }

    function onAuthorChange(e) {
        setAuthor(e.target.value)
    }

    function onIsbnChange(e) {
        setIsbn(e.target.value)
    }

    function incPage(e) {
        setCurrentPage(currentPage+1);
        search(currentPage+1);
    }

    function decPage(e) {
        setCurrentPage(currentPage-1);
        search(currentPage-1);
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

    function triggerModal(e) {
        setShow(!show);
    }

    function onSearch(e) {
        e.preventDefault();
        setCurrentPage(0);
        search(0);
    }

    function search(page) {
        const titleParam = title !== "" ? `intitle:${title}` : "";
        const authorParam = author !== "" ? `inauthor:${author}` : "";
        const isbnParam = isbn !== "" ? `isbn:${isbn}` : "";
        const indexParam = `startIndex=${page*MAX_BOOKS}&MaxResults=${MAX_BOOKS}`;

        const url = `https://www.googleapis.com/books/v1/volumes?q=${titleParam}+${authorParam}+${isbnParam}&${indexParam}`;

        console.log(`GET to ${url}`);

        axios.get(url).then(response => {
            if (response.status != 200) {
                throw new Error(`${url} returned status ${response.status}`);
            }
            return response.data;
        }).then(data => {
            console.log(data)
            setBooks(data.items ? data.items : []);
            setTotalBooks(data.totalItems);
        }).catch(error => {
            console.log('Error!')
            setBooks([]);
        });
    }
    
    return (
        <>
            <Form onSubmit={onSearch}>
                <Form.Group className="mb-1 pt-3" controlId="formBasicTitle">
                    <Form.Label>Book title</Form.Label>
                    <Form.Control type="text" placeholder="Book title" onChange={onTitleChange}/>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Author" onChange={onAuthorChange}/>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicAuthor">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" placeholder="ISBN" onChange={onIsbnChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
            <ButtonGroup vertical className='mb-5'>
                {books.length > 0 ? 
                    <>
                        <div className="p-2 m-2 text-muted">Showing {currentPage*MAX_BOOKS+1} - {Math.min((currentPage+1)*MAX_BOOKS, totalBooks)} out of {totalBooks} books</div>
                        {books.map(book => <div key={book.id} className='d-flex align-items-center' >
                                <Image src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "ingenBild.png"}  thumbnail/>
                                <Button variant="link" className='border' name={book.id} onClick={handleBookClick}>
                                    {book.volumeInfo.title} - {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No Author"}
                                </Button>
                            </div>)}
                        <Pagination className='mt-3'>
                            <Pagination.Item onClick={decPage} disabled={currentPage === 0} >Prev</Pagination.Item>
                            <Pagination.Item onClick={incPage} disabled={(currentPage+1) * MAX_BOOKS >= totalBooks}>Next</Pagination.Item>
                        </Pagination>
                    </>
                    : 
                    <div className="pt-3 mt-4 text-muted border-top">No books found</div>
                }
            </ButtonGroup>

            <BookModal cart = {cart} setCart = {setCart} fav = {fav} setFav = {setFav} book={book} show={show} triggerModal={triggerModal}/>
        </>
    );
}
export default SearchForm;