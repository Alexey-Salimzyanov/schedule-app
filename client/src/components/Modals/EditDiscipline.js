import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateDiscipline } from "../../http/disciplineAPI"; 

const EditDiscipline = ({ show, onHide, discipline, onUpdate }) => {
    const [name, setName] = useState("");
    const [shortName, setShortName] = useState("");

    useEffect(() => {
        if (discipline) {
            setName(discipline.name);
            setShortName(discipline.short_name);
        }
    }, [discipline]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateDiscipline(discipline.id, { name, short_name: shortName });
        onUpdate(); // Обновляем список дисциплин
        onHide(); // Закрываем модальное окно
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать дисциплину</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Название дисциплины</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicShortName">
                        <Form.Label>Краткое название дисциплины</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите краткое название"
                            value={shortName}
                            onChange={(e) => setShortName(e.target.value)}
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

export default EditDiscipline;