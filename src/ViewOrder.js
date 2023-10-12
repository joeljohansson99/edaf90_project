import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import BookModal from "./BookModal"
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { useOutletContext, useLoaderData } from "react-router-dom";
import Footer from './Footer';
import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";


function ViewOrder(props){

    const {cart, setCart} = useOutletContext();
    const {show, setShow} = useOutletContext();
    const {book, setBook} = useOutletContext();


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
            triggerModal();
        });
    }
    function submitOrder(){
        window.localStorage.removeItem("Shopping-cart");
        setCart([]);
    }

    return (
            <section className="h-100" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                                Shopping Cart
                             </MDBTypography>
                            </div>
                            {cart.length > 0 ? 
                                cart.map(book => <div key={book.id}> 
                                 <MDBCard  className="rounded-3 mb-4">
                                    <MDBCardBody className="p-4">
                                        <MDBRow className="justify-content-between align-items-center">
                                        <MDBCol md="2" lg="2" xl="2">
                                            <MDBCardImage className="rounded-3" fluid
                                                src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "ingenBild.png"}
                                                alt="Cotton T-shirt" />
                                        </MDBCol>
                                        <MDBCol md="3" lg="3" xl="3">
                                            <p className="lead fw-normal mb-2">{book.volumeInfo.title} - {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No Author"}</p>
                                        </MDBCol>
                                        <MDBCol md="3" lg="3" xl="2"
                                            className="d-flex align-items-center justify-content-around">
                                            <MDBBtn color="link" className="px-2">
                                                 <MDBIcon fas icon="minus" />
                                            </MDBBtn>

                                        <MDBInput min={0} defaultValue={1} type="number" size="sm" />

                                        <MDBBtn color="link" className="px-2">
                                            <MDBIcon fas icon="plus" />
                                        </MDBBtn>
                                        </MDBCol>
                                        <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                            <MDBTypography tag="h5" className="mb-0">
                                                {book.saleInfo.amount}
                                            </MDBTypography>
                                        </MDBCol>
                                        <MDBCol md="1" lg="1" xl="1" className="text-end">
                                            <a href="#!" className="text-danger">
                                                <MDBIcon fas icon="trash text-danger" size="lg" />
                                             </a>
                                        </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                        </div>) : <div> </div>}
                    </MDBCol>
                </MDBRow>
                <Button variant="success" className="w-100 p-3" key={book.id} onClick={submitOrder}> Submit order</Button>

            </MDBContainer>
        </section>
        );
}
export default ViewOrder;
