import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ToastConfirm(props) {
  const {showConfirm, setShowConfirm} = props;
  const toggleShowConfirm = () => setShowConfirm(!showConfirm);

  return (
    <Row>
      <Col md={6} className="mb-2">
        <Toast show={showConfirm} onClose={toggleShowConfirm}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Confirmation</strong>
          </Toast.Header>
          <Toast.Body dangerouslySetInnerHTML={{__html: props.body}}></Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default ToastConfirm;