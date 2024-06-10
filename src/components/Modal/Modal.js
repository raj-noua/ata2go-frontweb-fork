import React        from "react";
import Button       from "react-bootstrap/Button";
import Modal        from "react-bootstrap/Modal";
import ModalForm    from "./ModalForm";

const ModalBody = ({ show, handleClose }) => {
    return (
        <>
            {/* <Button variant="primary" >
                    Launch static backdrop modal
                </Button> */}

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>  <Modal.Title>Update Information</Modal.Title>   </Modal.Header>
                <Modal.Body>    <div className="modal-form">    <ModalForm />   </div>      </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" variant="primary">                  Update  </Button>
                    <Button className="danger-btn" variant="danger" onClick={handleClose}>  Close   </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalBody;
