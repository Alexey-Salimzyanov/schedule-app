import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateGroup } from '../../http/groupAPI';
// Компонент модального окна для создания группы
const CreateGroupModal = ({show, onHide}) => {
    // Состояние для хранения названия группы
    const [groupName, setGroupName] = useState('');
    // Обработчик изменения ввода названия группы
    const handleInputChange = (event) => {
        setGroupName(event.target.value);
    };
    // Обработчик нажатия кнопки "Добавить"
    const handleAddClick = async () => {
        if (groupName) {
            await CreateGroup(groupName);
            onHide();
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить группу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Название группы</Form.Label>
                        <Form.Control type="text" placeholder="Введите название группы" value={groupName} onChange={handleInputChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button 
                    variant="primary" 
                    onClick={handleAddClick} 
                    style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} // Устанавливаем цвет фона кнопки
                >
                    Добавить
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CreateGroupModal;