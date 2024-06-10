import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ handleDeleteItem, setDeleteModal, deleteModal, question, heading, id }) => {
    return (
        <Modal show={deleteModal} onHide={() => setDeleteModal(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>      <Modal.Title>{heading}</Modal.Title>                    </Modal.Header>
            <Modal.Body>
                <div className="modal-form">
                    <h5>{question}</h5>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="danger-btn" variant="danger" onClick={() => setDeleteModal(false)}>  Cancel  </Button>
                <Button className="success-button" onClick={() => handleDeleteItem(id)}>                Delete  </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
