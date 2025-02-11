import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateDepartment } from '../../http/departmentAPI';

// Компонент модального окна для создания кафедры
const CreateDepartmentModal = ({show, onHide}) => {
    // Состояние для хранения названия кафедры
    const [departmentName, setDepartmentName] = useState('');
    // Обработчик изменения ввода названия кафедры
    const handleInputChange = (event) => {
        setDepartmentName(event.target.value);
    };
    // Обработчик нажатия кнопки "Добавить"
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
export default CreateDepartmentModal;