import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function BookModal(props){
    const {fav, setFav} = props;
    const book = props.book;
    const {cart, setCart} = props;
    const {showConfirm, setShowConfirm} = props;

    function setFavorite(e){
        setFav(favs => [...favs, book])
        window.localStorage.setItem("Favorites", JSON.stringify(fav))
        props.triggerModal()
    }

    function removeFavorite(e){
        setFav(favs => favs.filter(b => b.id !== book.id))
        window.localStorage.setItem("Favorites", JSON.stringify(fav))
        props.triggerModal()
    }

    function addCart(e){
        if(!cart.map(b => b.id).includes(book.id)){
            setCart(currCart => [...currCart, {...book, quantity:1}])
            window.localStorage.setItem("Cart", JSON.stringify(cart))
        }
        else{
            const q = cart.find(b => b.id === book.id).quantity
            setCart(currCart => currCart.filter(b => b.id !==book.id))
            setCart(currCart => [...currCart, {...book, quantity: q+1}])
            window.localStorage.setItem("Cart", JSON.stringify(cart))
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