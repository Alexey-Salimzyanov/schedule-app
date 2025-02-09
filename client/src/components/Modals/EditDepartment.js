import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateDepartment } from "../../http/departmentAPI"; 

const EditDepartment = ({ show, onHide, department, onUpdate }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        if (department) {
            setName(department.name);
        }
    }, [department]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDepartment(department.id,  name );
            onUpdate(); // Обновляем список кафедр
            onHide(); // Закрываем модальное окно
        } catch (error) {
            console.error("Ошибка при обновлении кафедры:", error);
            alert("Не удалось обновить кафедру. Пожалуйста, попробуйте еще раз.");
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать кафедру</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название кафедры</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название кафедры"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Button className="mt-3" variant="primary" type="submit">
                        Сохранить изменения
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditDepartment;