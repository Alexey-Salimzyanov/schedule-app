import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updatePosition } from '../../http/positionAPI'; 

const EditPosition = ({ show, onHide, position, fetchData }) => {
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');

    useEffect(() => {
        if (position) {
            setName(position.name);
            setShortName(position.short_name);
        }
    }, [position]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePosition(position.id, name, shortName);
        fetchData(); // Обновляем данные после редактирования
        onHide(); // Закрываем модальное окно
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать должность</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formShortName">
                        <Form.Label>Короткое имя</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={shortName} 
                            onChange={(e) => setShortName(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Сохранить изменения
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPosition;