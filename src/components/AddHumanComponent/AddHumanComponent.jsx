import React, { useState } from 'react'
import { Button, FormControl, Modal } from 'react-bootstrap'

const AddHumanComponent = ({show, closeModal, addHuman}) => {
const [name, setName] = useState('')

const handleAddHuman = (name) => {
    addHuman(name);
    setName('');
    closeModal();
}

  return(<Modal show={show} onHide={()=>closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>New Human</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormControl
                            placeholder="Search.."
                            onChange={(e) => setName(e.target.value)}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={name}
                        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>closeModal()}>
            Close
          </Button>
          <Button 
          variant="primary" 
          disabled={name.length < 2}
          onClick={()=>handleAddHuman(name)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>)
}

export default AddHumanComponent