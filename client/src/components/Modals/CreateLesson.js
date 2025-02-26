import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getTeachers } from '../../http/TeacherAPI';
import { getGroups } from '../../http/groupAPI';
import { getDisciplines } from '../../http/disciplineAPI';
import { getAuds } from '../../http/audAPI';
import { createLesson } from '../../http/lessonAPI';
import DatePicker, { registerLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('ru', ru);

// Компонент модального окна для создания урока
const CreateLessonModal = ({ show, onHide }) => {

    // Создаем необходимые состояния
    const [numOfLesson, setNumOfLesson] = useState('');
    const [firstDate, setFirstDate] = useState('');
    const [lastDate, setLastDate] = useState('');
    const [period, setPeriod] = useState('');
    const [groups, setGroups] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [auditoriums, setAuditoriums] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedAuditorium, setSelectedAuditorium] = useState(null);

    // Используем useEffect для получения данных из БД при монтировании компонента
    useEffect(() => {
        getGroups().then(data => setGroups(data.sort((a, b) => a.name.localeCompare(b.name))));
        getDisciplines().then(data => setDisciplines(data.sort((a,b)  =>  a.name.localeCompare(b.name))));
        getTeachers().then(data => setTeachers(data.sort((a,b)  =>  a.surname_N_P.localeCompare(b.surname_N_P))));
        getAuds().then(data => setAuditoriums(data.sort((a,b)  =>  a.number.localeCompare(b.number))));
    }, []);

    // Обработчик нажатия кнопки "Добавить"
    const handleAddClick = async () => {
        if (selectedGroup && selectedDiscipline && selectedTeacher && selectedAuditorium && numOfLesson && firstDate && lastDate && period) {
            await createLesson(Number(numOfLesson), firstDate, Number(period), lastDate, selectedTeacher, selectedDiscipline, selectedGroup, selectedAuditorium);
            onHide();
        }
        setSelectedGroup(null);
        setSelectedDiscipline(null);
        setSelectedTeacher(null);
        setSelectedAuditorium(null);
    };

    // Функция для проверки валидности даты
    const isDateValid = (date) => {
        return date instanceof Date && !isNaN(date);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить занятие</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">Номер пары</Form.Label>
                        <Form.Select value={numOfLesson} onChange={e => setNumOfLesson(e.target.value)}>
                            <option value="">Выберите номер пары</option>
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option value={num}>{num}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold", display: "block" }} className="mt-1">Дата первого занятия</Form.Label>
                        <DatePicker
                            selected={firstDate}
                            onChange={date => setFirstDate(date)}
                            dateFormat="yyyy-MM-dd"
                            locale="ru"
                            className={`form-control`}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">Приодичность занятия</Form.Label>
                        <Form.Select value={period} onChange={e => setPeriod(e.target.value)}>
                            <option value="">Выберите период</option>
                            {[{ val: 0, title: 'Разовое занятие' }, { val: 1, title: '1 неделя' }, { val: 2, title: '2 недели' }, { val: 4, title: '4 недели' }].map((elem) => (
                            <option value={elem.val}>{elem.title}</option>
                          ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold", display: "block" }} className="mt-1">Дата последнего занятия</Form.Label>
                        <DatePicker
                            selected={lastDate}
                            onChange={date => setLastDate(date)}
                            dateFormat="yyyy-MM-dd"
                            locale="ru"
                            className={`form-control`}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">Аудитория</Form.Label>
                        <Form.Select value={selectedAuditorium} onChange={e => setSelectedAuditorium(e.target.value)}>
                            <option value="">Выберите аудиторию</option>
                            {auditoriums.map(auditorium => (
                                <option value={auditorium.id}>{auditorium.number}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">Преподаватель</Form.Label>
                        <Form.Select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)}>
                            <option value="">Выберите преподавателя</option>
                            {teachers.map(teacher => (
                                <option value={teacher.id}>{teacher.surname_N_P}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">Дисциплина</Form.Label>
                        <Form.Select value={selectedDiscipline} onChange={e => setSelectedDiscipline(e.target.value)}>
                            <option value="">Выберите дисциплину</option>
                            {disciplines.map(department => (
                                <option value={department.id}>{department.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: "bold" }} className="mt-1">Группа</Form.Label>
                        <Form.Select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
                            <option value="">Выберите группу</option>
                            {groups.map(position => (
                                <option value={position.id}>{position.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" disabled={!selectedGroup || !selectedDiscipline || !selectedTeacher || !selectedAuditorium || !numOfLesson || !firstDate || !lastDate || !period} onClick={handleAddClick}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateLessonModal;