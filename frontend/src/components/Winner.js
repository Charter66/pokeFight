import React from "react";
import { Modal, Button } from "react-bootstrap";

const Winner = ({ winner, show, handleClose,handleNewFight }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title >Winner!</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <h4>{winner}</h4>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleNewFight}>
          New Opponent
        </Button>
        <Button variant="secondary" className="close-btn" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Winner;
