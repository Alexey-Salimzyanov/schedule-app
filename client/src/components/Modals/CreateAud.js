import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getTypes } from '../../http/typeAPI';
import { CreateAud } from '../../http/audAPI';

// Компонент модального окна для создания аудитории
const CreateAudModal = ({show, onHide}) => {
    
    // Создаем необходимые состояния
    const [AudNumber, setAudNumber] = useState('');
    const [AudCapacity, setAudCapacity] = useState('');
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    // Функция для получения данных о типах аудиторий из БД
    useEffect(() => {
        getTypes().then(data => setTypes(data));
    }, []);

    // Обработчики изменения ввода номера и вместимости аудитории
    const handleAudNumberInputChange = (event) => {
        setAudNumber(event.target.value);
    };
    const handleAudCapacityInputChange = (event) => {
        setAudCapacity(event.target.value);
    };

    // Обработчик нажатия кнопки "Добавить"
    const handleAddClick = async () => {
        if (AudNumber && AudCapacity && selectedType) {
            await CreateAud(AudNumber,Number(AudCapacity),selectedType);
            onHide();
        }
        setSelectedType(null);
        setAudNumber('');
        setAudCapacity('');
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить Аудиторию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Номер аудитории</Form.Label>
                        <Form.Control type="text" placeholder="Введите номер аудитории" value={AudNumber} onChange={handleAudNumberInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Вместимость аудитории</Form.Label>
                        <Form.Control type="int" placeholder="Введите вместимость аудитории" value={AudCapacity} onChange={handleAudCapacityInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: "bold"}} className="mt-1">Тип аудитории</Form.Label>
                        <Form.Select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                            <option value="">Выберите тип аудитории</option>
                            {types.map(type => (
                            <option value={type.id}>{type.name}</option>
                            ))}
                        </Form.Select>
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

export default CreateAudModal;
