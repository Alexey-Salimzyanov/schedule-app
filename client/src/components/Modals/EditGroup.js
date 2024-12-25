import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateGroup } from "../../http/groupAPI"; 

const EditGroup = ({ show, onHide, group, onUpdate }) => {
    const [groupName, setGroupName] = useState("");

    // Эффект для установки начального значения названия группы при открытии модального окна
    useEffect(() => {
        if (group) {
            setGroupName(group.name);
        }
    }, [group]);

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (group) {
            await updateGroup(group.id, { name: groupName });
            onUpdate(); // Обновляем список групп
            onHide(); // Закрываем модальное окно
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать группу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Название группы</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название группы"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Сохранить изменения
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditGroup;