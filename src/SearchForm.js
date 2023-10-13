import { useState, useLayoutEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import BookModal from "./BookModal"
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { useOutletContext, useNavigate, useSearchParams} from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import Toast from './Toast';

function SearchForm() {
    const MAX_BOOKS = 10;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");

    const [books, setBooks] = useState([])
    const [totalBooks, setTotalBooks] = useState(0)

    const {cart, setCart} = useOutletContext();
    const {fav, setFav} = useOutletContext();
    const {show, setShow} = useOutletContext();
    const {book, setBook} = useOutletContext();

    const [showConfirm, setShowConfirm] = useState(false);

    useLayoutEffect(() => {
        if (searchParams.get("q")) {
            search()
        } else {
            setBooks([]);
            setTotalBooks([]);
        }
    }, [searchParams]);

    function onTitleChange(e) {
        setTitle(e.target.value)
    }

    function onAuthorChange(e) {
        setAuthor(e.target.value)
    }

    function onIsbnChange(e) {
        setIsbn(e.target.value)
    }

    function changePage(change) {
        const q = searchParams.get("q");
        const startIndex = parseInt(searchParams.get("startIndex")) + change;
        const maxResults = searchParams.get("maxResults");

        const indexParam = `startIndex=${startIndex}&maxResults=${maxResults}`;
        const query = `?q=${q}&${indexParam}`;

        navigate(`/search-form${query}`);
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

    function triggerModal(e) {
        setShow(!show);
    }

    function onSearch(e) {
        e.preventDefault();
        const titleParam = title !== "" ? `intitle:${title}` : "";
        const authorParam = author !== "" ? `inauthor:${author}` : "";
        const isbnParam = isbn !== "" ? `isbn:${isbn}` : "";
        const indexParam = `startIndex=0&maxResults=${MAX_BOOKS}`;
        const query = `?q=${titleParam}+${authorParam}+${isbnParam}&${indexParam}`;
        navigate(`/search-form${query}`);
    }

    function search() {
        const q = searchParams.get("q");
        const startIndex = searchParams.get("startIndex");
        const maxResults = searchParams.get("maxResults");

        const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}&maxResults=${maxResults}`;


        axios.get(url).then(response => {
            if (response.status != 200) {
                throw new Error(`${url} returned status ${response.status}`);
            }
            return response.data;
        }).then(data => {
            setBooks(data.items ? data.items : []);
            setTotalBooks(data.totalItems);
        }).catch(error => {
            console.log(error.message)
            setBooks([]);
        });
    }
    
    return (
        <>
            <Toast setShowConfirm={setShowConfirm} showConfirm={showConfirm} body={`<p> ${book.volumeInfo.title} was added to shopping cart! </p>`}/>
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
                        <div className="p-2 m-2 text-muted">
                            Showing {parseInt(searchParams.get("startIndex")) + 1} - {Math.min(parseInt(searchParams.get("startIndex")) + parseInt(searchParams.get("maxResults")), totalBooks)} out of {totalBooks} books
                        </div>
                        {books.map(book => <div key={book.id} className='d-flex align-items-center' >
                                <Image src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "ingenBild.png"}  thumbnail/>
                                <Button variant="link" className='border' name={book.id} onClick={handleBookClick}>
                                    {book.volumeInfo.title} - {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No Author"}
                                </Button>
                            </div>)}
                        <Pagination className='mt-3'>
                            <Pagination.Item 
                                onClick={e => changePage(-parseInt(searchParams.get("maxResults")))} 
                                disabled={searchParams.get("startIndex") === "0"} >
                            Prev </Pagination.Item>
                            <Pagination.Item 
                                onClick={e => changePage(parseInt(searchParams.get("maxResults")))} 
                                disabled={parseInt(searchParams.get("startIndex")) + parseInt(searchParams.get("maxResults")) >= totalBooks}>
                            Next</Pagination.Item>
                        </Pagination>
                    </> //Warning: Received `true` for a non-boolean attribute `on`.
                    : 
                    <div className="pt-3 mt-4 text-muted border-top">No books found</div>
                }
            </ButtonGroup>

            <BookModal showConfirm = {showConfirm} setShowConfirm = {setShowConfirm} cart = {cart} setCart = {setCart} fav = {fav} setFav = {setFav} book={book} show={show} triggerModal={triggerModal}/>
        </>
    );
}
export default SearchForm;