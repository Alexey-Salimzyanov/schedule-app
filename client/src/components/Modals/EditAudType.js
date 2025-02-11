import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateType } from "../../http/typeAPI"; 

const EditAudType = ({ show, onHide, type, onUpdate }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        if (type) {
            setName(type.name);
        }
    }, [type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateType(type.id, { name });
            onUpdate(); // Обновляем список типов
            onHide(); // Закрываем модальное окно
        } catch (error) {
            console.error("Ошибка при обновлении типа:", error);
            alert("Не удалось обновить тип аудитории. Пожалуйста, проверьте консоль для получения дополнительной информации.");
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать тип аудитории</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название типа аудитории</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название"
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

export default EditAudType;