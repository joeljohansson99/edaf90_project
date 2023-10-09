import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function BookModal(props){
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
                <Button variant="primary" onClick={props.triggerModal}>
                    Add to favourites
                </Button>
                <Button variant="success" onClick={props.triggerModal}>
                    Add to cart
                </Button>
            </Modal.Footer>
      </Modal>
    )
}

export default BookModal;