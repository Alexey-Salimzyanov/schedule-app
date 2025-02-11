import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateDiscipline } from '../../http/disciplineAPI';

// Компонент модального окна для создания дисциплины
const CreateDisciplineModal = ({show, onHide}) => {
    // Состояние для хранения названия и краткого названия дисциплины
    const [DisciplineName, setDisciplineName] = useState('');
    const [DisciplineShortName, setDisciplineShortName] = useState('');

    // Обработчики изменения ввода названия и краткого названия дисциплины
    const handleNameInputChange = (event) => {
        setDisciplineName(event.target.value);
    };
    const handleShortNameInputChange = (event) => {
        setDisciplineShortName(event.target.value);
    };

    // Обработчик нажатия кнопки "Добавить"
    const handleAddClick = async () => {
        if (DisciplineName && DisciplineShortName) {
            await CreateDiscipline(DisciplineName, DisciplineShortName);
            onHide();
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить дисциплину</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Название дисциплины</Form.Label>
                        <Form.Control type="text" placeholder="Введите название дисциплины" value={DisciplineName} onChange={handleNameInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Краткое название дисциплины</Form.Label>
                        <Form.Control type="text" placeholder="Введите краткое название дисциплины" value={DisciplineShortName} onChange={handleShortNameInputChange} />
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
export default CreateDisciplineModal;
