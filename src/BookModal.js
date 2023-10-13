import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function BookModal(props){
    const {fav, setFav} = props;
    const book = props.book;
    const {cart, setCart} = props;
    const {showConfirm, setShowConfirm} = props;

    function setFavorite(e){
        const newFav = [...fav, book]
        setFav(newFav)
        window.localStorage.setItem("Favorites", JSON.stringify(newFav))
        props.triggerModal()
    }

    function removeFavorite(e){
        const newFav = fav.filter(b => b.id !== book.id)
        setFav(newFav)
        window.localStorage.setItem("Favorites", JSON.stringify(newFav))
        props.triggerModal()
    }

    function addCart(e){
        if(!cart.map(b => b.id).includes(book.id)){
            const newCart = [...cart, {...book, quantity:1}];
            setCart(newCart)
            window.localStorage.setItem("Cart", JSON.stringify(newCart))
        }
        else{
            const q = cart.find(b => b.id === book.id).quantity
            const newCart = [...cart.filter(b => b.id !== book.id), {...book, quantity: q+1}]
            setCart(newCart)
            window.localStorage.setItem("Cart", JSON.stringify(newCart))
        }
        setShowConfirm(!showConfirm);
        props.triggerModal()
    }

    return (
        <Modal show={props.show} onHide={props.triggerModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.book.volumeInfo.title} - {props.book.volumeInfo.authors ? props.book.volumeInfo.authors.join(", ") : "No Author"}</Modal.Title>
                </Modal.Header>
            <Modal.Body><div dangerouslySetInnerHTML={{__html: props.book.volumeInfo.description}}></div></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.triggerModal}>
                    Close
                </Button>
                {!fav.map(b => b.id).includes(book.id) ? (
                    <Button variant="primary" onClick={setFavorite}>Add to favourites
                    </Button> ) : (
                        <Button variant="primary" onClick={removeFavorite}>Remove from favourites
                        </Button> 
                    )
                }
                <Button variant="success" onClick={addCart}>
                    Add to cart
                </Button>
            </Modal.Footer>
      </Modal>
    )
}

export default BookModal;