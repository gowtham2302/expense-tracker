import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../context/BudgetContext";

 
 export default function AddBudgetModal({ show , handleClose }) {

    const nameRef = useRef()
    const maxRef = useRef()

    const { addBudget } = useBudgets()

    function handleSubmit(e){
        e.preventDefault()
        addBudget({
            name : nameRef.current.value,
            max : parseFloat(maxRef.current.value),
        })
        handleClose()
    }
     
   return (
    <Modal show={show}  onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount">
                    <Form.Label>Maximum Amount</Form.Label>
                    <Form.Control type="number" ref={maxRef} required min={0} step={1}/>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                        Add 
                    </Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
   )
 }
 