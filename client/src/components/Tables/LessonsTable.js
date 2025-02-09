import React, { useEffect, useState } from "react";
import {Table, Button} from "react-bootstrap";
import { deleteLesson, getLessons } from "../../http/lessonAPI";
import CreateLessonModal from "../Modals/CreateLesson";
import EditLessons from "../Modals/EditLessons";

// Компонент таблицы уроков
const LessonsTable = () => {
    // Состояние для хранения списка уроков
    const [schedule, setSchedule] = useState([]);
    // Состояние для управления модальным окном
    const [showLessonModal, setShowLessonModal] = useState(false);
    // Состояние для выбранного урока
    const [selectedLesson, setSelectedLesson] = useState(null); 

    // Функция для получения данных о уроках из БД
    const fetchData = async () => {
        const scheduleData = await getLessons();
        scheduleData.sort((a, b) => a.id - b.id);
        setSchedule(scheduleData);
    };

    // Обработчик открытия модального окна для создания нового занятия
    const handleShowLessonModal = () => {
        setSelectedLesson(null); // Сбрасываем выбранный урок для создания нового
        setShowLessonModal(true);
    };

    // Обработчик для редактирования занятия
    const handleEditClick = (lesson) => {
        setSelectedLesson(lesson);
        setShowLessonModal(true);
    };

    // Функция для удаления занятия с подтверждением
    const handleDeleteLesson = async (id) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить это занятие?");
        if (confirmDelete) {
            await deleteLesson(id);
            fetchData();
        }
    };

    // Используем useEffect для вызова fetchData при монтировании компонента
    useEffect(() => {
        fetchData();
    }, []);

    // Возвращаем разметку компонента
    return (
        <>
            <Button 
                variant="primary" 
                onClick={handleShowLessonModal} 
                className="mt-3" 
                style={{ backgroundColor: '#4682B4', borderColor: '#4682B4' }} // Устанавливаем цвет фона и границы
            >
                Добавить занятие
            </Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>№ аудитории</th>
                        <th>№ пары</th>
                        <th>Преподаватель</th>
                        <th>Дисциплина</th>
                        <th>Группа</th>
                        <th>Дата первого занятия</th>
                        <th>Период</th>
                        <th>Дата последнего занятия</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((item, index) => (
                        <tr key={index}>
                            <td>{item.auditorium_list && item.auditorium_list.number ? item.auditorium_list.number : 'NULL'}</td>
                            <td>{item.number}</td>
                            <td>{item.teacher_list&& item.teacher_list.surname_N_P ? item.teacher_list.surname_N_P : 'NULL'}</td>
                            <td>{item.discipline_list && item.discipline_list.short_name ? item.discipline_list.short_name : 'NULL'}</td>
                            <td>{item.group_list && item.group_list.name ? item.group_list.name : 'NULL'}</td>
                            <td>{new Date(item.firstDate).toLocaleDateString()}</td>
                            <td>{item.period}</td>
                            <td>{new Date(item.lastDate).toLocaleDateString()}</td>
                            <td>
                                <Button 
                                    variant="outline-danger" 
                                    onClick={() => handleDeleteLesson(item.id)} // Используем новую функцию для удаления
                                >
                                    Удалить
                                </Button>
                                <Button 
                                    variant="outline-warning" 
                                    onClick={() => handleEditClick(item)} // Обработчик для редактирования
                                    className="ms-2" // Добавляем отступ слева
                                >
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                        {/* Модальное окно для создания или редактирования занятия */}
                        {selectedLesson ? (
                <EditLessons 
                    show={showLessonModal} 
                    onHide={() => { setShowLessonModal(false); setSelectedLesson(null); fetchData(); }} // Сбрасываем выбранный урок при закрытии
                    lesson={selectedLesson} // Передаем выбранный урок для редактирования
                />
            ) : (
                <CreateLessonModal 
                    show={showLessonModal} 
                    onHide={() => { setShowLessonModal(false); fetchData(); }} // Сбрасываем выбранный урок при закрытии
                />
            )}
        </>
    );
};

export default LessonsTable;
