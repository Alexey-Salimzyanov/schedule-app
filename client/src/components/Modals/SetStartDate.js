import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

registerLocale('ru', ru);

// Компонент модального окна для создания урока
const SetStartDateModal = observer(({ show, onHide }) => {

	const {startDate: currentStartDate} = useContext(Context);
	console.log(currentStartDate);
	
    // Создаем необходимые состояния
    const [startDate, setStartDate] = useState(currentStartDate.startDate);

    // Используем useEffect для установки начальной даты при монтировании
    useEffect(() => {
        setStartDate(currentStartDate.startDate);
    }, [currentStartDate.startDate]);

    // Обработчик нажатия кнопки "Добавить"
    const handleAddClick = async () => {
			currentStartDate.setstartDate(startDate)
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