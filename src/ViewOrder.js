import Button from 'react-bootstrap/Button';
import { useOutletContext } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
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
    const navigate = useNavigate();
    const {cart, setCart} = useOutletContext();
    const [showConfirm, setShowConfirm] = useState(false);
    const [receipt, setReceipt] = useState("");

    function submitOrder(){
        window.localStorage.removeItem("Shopping-cart");
        setReceipt(`<p> Ordered books: </p> ${cart.map(book => `<p>${book.volumeInfo.title} (x${book.quantity})</p>`).join("")}`);
        setShowConfirm(!showConfirm);
        setCart([]);
    }

    function handleSearchClick(){
        navigate(`/search-form`);
    }

    function removeItem(book){
        const newCart = cart.filter(b => b.id !== book.id)
        setCart(newCart)
        window.localStorage.setItem("Cart", JSON.stringify(newCart))

    }

    function handleQuantityChange(e){
        const newCart = cart.map(b => b.id === e.target.name ? {...b , quantity:e.target.value} : b)
        setCart(newCart);
        window.localStorage.setItem("Cart", JSON.stringify(newCart))
    }

    return (
            <section className="h-100">
            <Toast setShowConfirm={setShowConfirm} showConfirm={showConfirm} body={receipt}/>
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
                                                src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "ingenBild.png"}
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

                                        <MDBInput min={0} defaultValue={book.quantity} onChange={handleQuantityChange} name={book.id} type="number" size="sm" />


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
                                            <Button key={book.id} variant="danger" className=" p-3" onClick={() => removeItem(book)}>X</Button>
                                        </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                        </div>) : <div> </div>}
                    </MDBCol>
                </MDBRow>
                {cart.length > 0 ? 
                    (<Button variant="success" className="w-30 p-3" onClick={submitOrder}> Submit order</Button>)
                    : (
                    <Button variant="info" className="w-30 p-3" onClick={handleSearchClick}>Search for books</Button>)}
            </MDBContainer>
        </section>
        );
}
export default ViewOrder;
