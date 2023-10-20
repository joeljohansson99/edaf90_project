import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function BookModal(props) {
    const { fav, favDispatch } = props;
    const { book } = props;
    const { cartDispatch } = props;
    const { showConfirm, setShowConfirm } = props;

    function addCart(e) {
        setShowConfirm(!showConfirm);
        props.triggerModal()
        cartDispatch({ type: "add-book", book:book })
    }

    return (
        <Modal show={props.show} onHide={props.triggerModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.book.volumeInfo.title} - {props.book.volumeInfo.authors ? props.book.volumeInfo.authors.join(", ") : "No Author"}</Modal.Title>
            </Modal.Header>
            <Modal.Body><div dangerouslySetInnerHTML={{ __html: props.book.volumeInfo.description }}></div></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.triggerModal}>
                    Close
                </Button>
                {!fav.map(b => b.id).includes(book.id) ? (
                    <Button variant="primary" onClick={() => favDispatch({ type: "add-fav", book: book })}>Add to favourites
                    </Button>) : (
                    <Button variant="primary" onClick={() => favDispatch({ type: "remove-fav", book: book })}>Remove from favourites
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