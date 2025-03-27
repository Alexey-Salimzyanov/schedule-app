import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
import { observer } from 'mobx-react-lite';
import { getInit, updateInit } from '../../http/initAPI';

registerLocale('ru', ru);

// Компонент модального окна для создания урока
const SetStartDateModal = observer(({ show, onHide }) => {
	
    // Создаем необходимые состояния
    const [DBstartDate, setStartDate] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await getInit(1);
            const startDateFromDB = response.startDate;
            setStartDate(startDateFromDB)   
        };
        fetchData();
    }, []);

    
    // Вычисление текущей даты на основе даты начала семетра и номера недели
    let startDate = new Date(DBstartDate);

    // Обработчик нажатия кнопки "Добавить"
    const handleAddClick = async () => {
            updateInit(1, startDate)
            onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Установка даты начала семестра</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold", display: "block" }} className="mt-1">Дата начала семестра</Form.Label>
                        <DatePicker
							
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            locale="ru"
                            className={`form-control`}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleAddClick}>
                    Установить
                </Button>
            </Modal.Footer>
        </Modal>
    );
})

export default SetStartDateModal;