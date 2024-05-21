import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateDepartment } from '../../http/departmentAPI';

const CreateDepartmentModal = ({show, onHide}) => {
    const [departmentName, setDepartmentName] = useState('');

    const handleInputChange = (event) => {
        setDepartmentName(event.target.value);
    };

    const handleAddClick = async () => {
        if (departmentName) {
            await CreateDepartment(departmentName);
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить кафедру</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Название кафедры</Form.Label>
                        <Form.Control type="text" placeholder="Введите название кафедры" value={departmentName} onChange={handleInputChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" disabled={!departmentName} onClick={handleAddClick}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateDepartmentModal;