import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateAud } from "../../http/audAPI";
import { getTypes } from "../../http/typeAPI";

const EditAud = ({ show, onHide, auditorium }) => {
    const [number, setNumber] = useState("");
    const [capacity, setCapacity] = useState("");
    const [type, setType] = useState("");
    const [audTypesList, setAudTypesList] = useState([]);

    useEffect(() => {
        if (auditorium) {
            setNumber(auditorium.number);
            setCapacity(auditorium.capacity);
            setType(auditorium.type_list ? auditorium.type_list.id : ""); // Предполагается, что тип аудитории имеет id
        }
        getTypes().then((audTypes) => setAudTypesList(audTypes))


    }, [auditorium]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAud = {
            id: auditorium.id,
            number,
            capacity,
            typeListId: type, // Передаем id типа аудитории напрямую
        };

        try {
            await updateAud(updatedAud); // Функция для обновления аудитории
            onHide(); // Закрываем модальное окно
        } catch (error) {
            console.error("Ошибка при обновлении аудитории:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать аудиторию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNumber">
                        <Form.Label>Номер аудитории</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите номер аудитории"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCapacity">
                        <Form.Label>Вместимость</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите вместимость"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Тип аудитории</Form.Label>
                        <Form.Control
                            as="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        >
                            <option value="">Выберите тип аудитории</option>
                            {audTypesList.map((audType) => {
                                return <option value={audType.id}>{audType.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Button className="mt-3" variant="primary" type="submit">
                        Сохранить изменения
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditAud;