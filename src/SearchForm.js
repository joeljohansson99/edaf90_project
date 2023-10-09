import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import BookModal from "./BookModal"
import Image from 'react-bootstrap/Image';
import axios from 'axios';

function SearchForm() {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");

    const [books, setBooks] = useState([])

    const [show, setShow] = useState(false);
    const [book, setBook] = useState({volumeInfo:"test"});

    function onTitleChange(e) {
        setTitle(e.target.value)
    }

    function onAuthorChange(e) {
        setAuthor(e.target.value)
    }

    function onIsbnChange(e) {
        setIsbn(e.target.value)
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

        const titleParam = title !== "" ? `intitle:${title}` : "";
        const authorParam = author !== "" ? `inauthor:${author}` : "";
        const isbnParam = isbn !== "" ? `isbn:${isbn}` : "";

        const url = `https://www.googleapis.com/books/v1/volumes?q=${titleParam}+${authorParam}+${isbnParam}`;

        console.log(`GET to ${url}`);

        axios.get(url).then(response => {
            if (response.status != 200) {
                throw new Error(`${url} returned status ${response.status}`);
            }
            return response.data;
        }).then(data => {
            setBooks(data.items);
        })
    }
    
    return (
        <>
            <Form onSubmit={onSearch}>
                <Form.Group className="mb-1" controlId="formBasicTitle">
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
            <ButtonGroup vertical>
                {books.length > 0 ? 
                    books.map(book => <div key={book.id} >
                            <Image src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "ingenBild.png"}  thumbnail/>
                            <Button variant="link" className='border' name={book.id} onClick={handleBookClick}>
                                {book.volumeInfo.title} - {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No Author"}
                            </Button>
                        </div>)
                    : 
                    <div>No books found</div>
                }
            </ButtonGroup>

            <BookModal book={book} show={show} triggerModal={triggerModal}/>
        </>
    );
}
export default SearchForm;